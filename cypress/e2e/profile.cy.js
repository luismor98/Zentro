describe('Profile.vue — Vista de perfil de usuario', () => {

  // ── Bloque 1: Protección de ruta ─────────────────────────
  describe('Protección de ruta', () => {
    it('redirige a /login si el usuario no está autenticado', () => {
      cy.visit('/profile')
      cy.url().should('include', '/login')
    })

    it('permite el acceso a /profile cuando el usuario está autenticado', () => {
      cy.login()
      cy.url().should('include', '/profile')
    })
  })

  // ── Bloque 2: Elementos estructurales ────────────────────
  describe('Elementos estructurales de la vista', () => {
    beforeEach(() => {
      cy.login()
    })

    it('muestra el avatar con las iniciales del usuario', () => {
      cy.get('.avatar-initial')
        .should('exist')
        .invoke('text')
        .should('match', /^[A-Z]{1,2}$/)
    })

    it('muestra el nombre del usuario', () => {
      cy.get('.user-name')
        .should('exist')
        .invoke('text')
        .should('not.be.empty')
    })

    it('muestra las estadísticas de Emprendimientos, Favoritos y Reseñas', () => {
      cy.get('.stat-label').should('have.length', 3)
      cy.get('.stat-label').eq(0).should('contain.text', 'Emprendimientos')
      cy.get('.stat-label').eq(1).should('contain.text', 'Favoritos')
      cy.get('.stat-label').eq(2).should('contain.text', 'Reseñas')
    })

    it('muestra la seller card con el botón "Activar Modo Vendedor"', () => {
      cy.get('.seller-card').should('exist')
      cy.get('.btn-seller').should('contain.text', 'Activar Modo Vendedor')
    })

    it('muestra los dos tabs: Mis Negocios y Favoritos', () => {
      cy.get('.tab-btn').should('have.length.at.least', 2)
      cy.get('.tab-btn').eq(0).should('contain.text', 'Mis Negocios')
      cy.get('.tab-btn').eq(1).should('contain.text', 'Favoritos')
    })

    it('muestra el botón de cerrar sesión', () => {
      // En desktop está en sidebar, en mobile al final del contenido
      cy.get('.logout-btn, .logout-mobile').should('exist')
    })
  })

  // ── Bloque 3: Recepción de datos desde la API ─────────────
  describe('Recepción de datos desde Supabase', () => {
    beforeEach(() => {
      // Interceptar llamadas a Supabase antes del login
      cy.intercept('GET', '**/rest/v1/emprendimientos**').as('getEmprendimientos')
      cy.intercept('GET', '**/rest/v1/favoritos**').as('getFavoritos')
      cy.login()
    })

    it('llama a la API de emprendimientos al cargar el perfil', () => {
      cy.wait('@getEmprendimientos').its('response.statusCode').should('eq', 200)
    })

    it('llama a la API de favoritos al cargar el perfil', () => {
      cy.wait('@getFavoritos').its('response.statusCode').should('eq', 200)
    })

    it('el contador de Emprendimientos refleja los datos reales de la API', () => {
      cy.wait('@getEmprendimientos').then((interception) => {
        // Filtramos los que pertenecen al usuario autenticado
        const total = interception.response.body.length
        cy.get('.stat-item').eq(0).find('.stat-number')
          .invoke('text')
          .then((text) => {
            // El número mostrado debe ser <= al total devuelto por la API
            expect(parseInt(text)).to.be.lte(total)
          })
      })
    })

    it('el contador de Favoritos refleja los datos reales de la API', () => {
      cy.wait('@getFavoritos').then((interception) => {
        const total = interception.response.body.length
        cy.get('.stat-item').eq(1).find('.stat-number')
          .invoke('text')
          .then((text) => {
            expect(parseInt(text)).to.eq(total)
          })
      })
    })

    it('el tab Mis Negocios muestra los emprendimientos del usuario o el estado vacío', () => {
      cy.wait('@getEmprendimientos')
      cy.get('.tab-btn').eq(0).click()
      // Debe mostrar cards o el empty state — nunca nada
      cy.get('.empr-list, .empty-state').should('exist')
    })

    it('cada card de emprendimiento contiene nombre, categoría y botón Ver negocio', () => {
      cy.wait('@getEmprendimientos')
      cy.get('.tab-btn').eq(0).click()

      cy.get('body').then(($body) => {
        if ($body.find('.empr-item').length > 0) {
          cy.get('.empr-item').first().within(() => {
            cy.get('.empr-name').should('not.be.empty')
            cy.get('.empr-category').should('not.be.empty')
            cy.get('.empr-btn-ver').should('contain.text', 'Ver negocio')
          })
        } else {
          // No hay emprendimientos — el empty state debe estar visible
          cy.get('.empty-state').should('exist')
        }
      })
    })
  })

  // ── Bloque 4: Interacciones ───────────────────────────────
  describe('Interacciones del usuario', () => {
    beforeEach(() => {
      cy.login()
    })

    it('abre el modal al hacer clic en "Activar Modo Vendedor"', () => {
      cy.get('.btn-seller').click()
      cy.get('.modal').should('be.visible')
      cy.get('.modal-title').should('contain.text', 'Registrar emprendimiento')
    })

    it('el modal muestra todos los campos del formulario', () => {
      cy.get('.btn-seller').click()
      cy.get('.modal').within(() => {
        cy.get('input[placeholder*="nombre"]').should('exist')
        cy.get('select').first().should('exist')           // Categoría
        cy.get('textarea').should('exist')                 // Descripción
        cy.get('.days-picker').should('exist')             // Días
        cy.get('input[type="time"]').should('have.length', 2) // Apertura y cierre
      })
    })

    it('muestra error de validación si se intenta guardar sin nombre ni categoría', () => {
      cy.get('.btn-seller').click()
      cy.get('.btn-submit').click()
      cy.get('.form-error').should('be.visible')
    })

    it('cierra el modal al hacer clic en Cancelar', () => {
      cy.get('.btn-seller').click()
      cy.get('.btn-cancel').click()
      cy.get('.modal').should('not.exist')
    })

    it('cambia al tab Favoritos correctamente', () => {
      cy.get('.tab-btn').eq(1).click()
      cy.get('.tab-btn').eq(1).should('have.class', 'active')
      cy.get('.empr-list, .empty-state').should('exist')
    })

    it('navega al sidebar de Ajustes y muestra la sección de cuenta', () => {
      // En desktop el link de Ajustes está en el sidebar
      cy.get('.nav-item').contains('Ajustes').click()
      cy.get('.setting-item').should('have.length.at.least', 3)
      cy.get('.setting-item').eq(0).should('contain.text', 'Nombre')
      cy.get('.setting-item').eq(1).should('contain.text', 'Correo')
      cy.get('.setting-item').eq(2).should('contain.text', 'Contraseña')
    })
  })

})
