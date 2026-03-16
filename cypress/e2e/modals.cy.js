describe('Modales — Profile.vue', () => {

  beforeEach(() => {
    cy.login()
  })

  // ── Modal crear emprendimiento ────────────────────────────
  describe('Modal "Registrar emprendimiento"', () => {

    it('el modal está oculto al cargar la página', () => {
      cy.get('.modal').should('not.exist')
    })

    it('se abre al hacer clic en "Activar Modo Vendedor"', () => {
      cy.get('.btn-seller').click()
      cy.get('.modal').should('be.visible')
    })

    it('muestra el título correcto al abrirse en modo crear', () => {
      cy.get('.btn-seller').click()
      cy.get('.modal-title').should('contain.text', 'Registrar emprendimiento')
    })

    it('contiene todos los campos obligatorios del formulario', () => {
      cy.get('.btn-seller').click()
      cy.get('.modal').within(() => {
        // Nombre
        cy.contains('label', '¿Cómo se llama tu negocio?').should('exist')
        // Categoría
        cy.contains('label', 'Categoría').should('exist')
        // Descripción
        cy.contains('label', '¿Qué ofreces?').should('exist')
        // Días de la semana
        cy.get('.days-picker').should('exist')
        // Hora apertura y cierre
        cy.get('input[type="time"]').should('have.length', 2)
      })
    })

    it('muestra error si se intenta guardar sin nombre', () => {
      cy.get('.btn-seller').click()
      cy.get('.btn-submit').click()
      cy.get('.form-error')
        .should('be.visible')
        .and('contain.text', 'obligatorios')
    })

    it('muestra error si la descripción tiene menos de 20 caracteres', () => {
      cy.get('.btn-seller').click()
      cy.get('.modal').within(() => {
        cy.get('input').first().type('Mi negocio test')
        cy.get('select').first().select('Alimentos')
        cy.get('textarea').type('Corta')
      })
      cy.get('.btn-submit').click()
      cy.get('.form-error')
        .should('be.visible')
        .and('contain.text', '20 caracteres')
    })

    it('el contador de caracteres de descripción funciona en tiempo real', () => {
      cy.get('.btn-seller').click()
      cy.get('.char-count').should('contain.text', '0/200')
      cy.get('textarea').type('Descripción de prueba para el contador')
      cy.get('.char-count').should('not.contain.text', '0/200')
    })

    it('se cierra al hacer clic en el botón Cancelar', () => {
      cy.get('.btn-seller').click()
      cy.get('.modal').should('be.visible')
      cy.get('.btn-cancel').click()
      cy.get('.modal').should('not.exist')
    })

    it('se cierra al hacer clic en el botón X', () => {
      cy.get('.btn-seller').click()
      cy.get('.modal').should('be.visible')
      cy.get('.modal-close').click()
      cy.get('.modal').should('not.exist')
    })

    it('se cierra al hacer clic en el overlay (fuera del modal)', () => {
      cy.get('.btn-seller').click()
      cy.get('.modal').should('be.visible')
      cy.get('.modal-overlay').click({ force: true })
      cy.get('.modal').should('not.exist')
    })

  })

  // ── Modal de editar emprendimiento ────────────────────────
  describe('Modal "Editar emprendimiento"', () => {

    it('se abre con los datos precargados al hacer clic en Editar', () => {
      // Solo corre si hay al menos un emprendimiento del usuario
      cy.get('.tab-btn').eq(0).click()

      cy.get('body').then(($body) => {
        if ($body.find('.empr-btn-edit').length > 0) {
          cy.get('.empr-btn-edit').first().click()
          cy.get('.modal').should('be.visible')
          cy.get('.modal-title').should('contain.text', 'Editar emprendimiento')
          // El campo nombre no debe estar vacío (datos precargados)
          cy.get('.modal input').first().should('not.have.value', '')
        } else {
          cy.log('No hay emprendimientos para editar — test omitido')
        }
      })
    })

  })

  // ── Modal de confirmar eliminación ────────────────────────
  describe('Modal "Confirmar eliminación"', () => {

    it('se abre al hacer clic en el botón eliminar de una card', () => {
      cy.get('.tab-btn').eq(0).click()

      cy.get('body').then(($body) => {
        if ($body.find('.empr-btn-delete').length > 0) {
          cy.get('.empr-btn-delete').first().click()
          cy.get('.modal').should('be.visible')
        } else {
          cy.log('No hay emprendimientos para eliminar — test omitido')
        }
      })
    })

    it('muestra el nombre del emprendimiento en el mensaje de confirmación', () => {
      cy.get('.tab-btn').eq(0).click()

      cy.get('body').then(($body) => {
        if ($body.find('.empr-btn-delete').length > 0) {
          // Capturamos el nombre antes de abrir el modal
          cy.get('.empr-name').first().invoke('text').then((nombre) => {
            cy.get('.empr-btn-delete').first().click()
            cy.get('.delete-warning').should('contain.text', nombre.trim())
          })
        } else {
          cy.log('No hay emprendimientos — test omitido')
        }
      })
    })

    it('contiene los botones Cancelar y Sí, eliminar', () => {
      cy.get('.tab-btn').eq(0).click()

      cy.get('body').then(($body) => {
        if ($body.find('.empr-btn-delete').length > 0) {
          cy.get('.empr-btn-delete').first().click()
          cy.get('.modal').within(() => {
            cy.get('.btn-cancel').should('exist').and('contain.text', 'Cancelar')
            cy.get('.btn-delete').should('exist').and('contain.text', 'eliminar')
          })
        } else {
          cy.log('No hay emprendimientos — test omitido')
        }
      })
    })

    it('se cierra al hacer clic en Cancelar sin eliminar nada', () => {
      cy.get('.tab-btn').eq(0).click()

      cy.get('body').then(($body) => {
        if ($body.find('.empr-btn-delete').length > 0) {
          // Contamos emprendimientos antes
          cy.get('.empr-item').its('length').then((countAntes) => {
            cy.get('.empr-btn-delete').first().click()
            cy.get('.btn-cancel').click()
            cy.get('.modal').should('not.exist')
            // La cantidad debe ser la misma — no se eliminó nada
            cy.get('.empr-item').should('have.length', countAntes)
          })
        } else {
          cy.log('No hay emprendimientos — test omitido')
        }
      })
    })

    it('se cierra al hacer clic en el overlay sin eliminar nada', () => {
      cy.get('.tab-btn').eq(0).click()

      cy.get('body').then(($body) => {
        if ($body.find('.empr-btn-delete').length > 0) {
          cy.get('.empr-item').its('length').then((countAntes) => {
            cy.get('.empr-btn-delete').first().click()
            cy.get('.modal-overlay').click({ force: true })
            cy.get('.modal').should('not.exist')
            cy.get('.empr-item').should('have.length', countAntes)
          })
        } else {
          cy.log('No hay emprendimientos — test omitido')
        }
      })
    })

  })

})
