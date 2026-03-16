describe('Formulario de emprendimiento — validación y envío', () => {

  beforeEach(() => {
    cy.login()
    // Abrimos el modal antes de cada test
    cy.get('.btn-seller').click()
    cy.get('.modal').should('be.visible')
  })

  // ── Bloque 1: Campos obligatorios ────────────────────────
  describe('Validación de campos obligatorios', () => {

    it('muestra error si se envía el formulario completamente vacío', () => {
      cy.get('.btn-submit').click()
      cy.get('.form-error')
        .should('be.visible')
        .and('contain.text', 'obligatorios')
    })

    it('muestra error si solo se llena el nombre sin categoría', () => {
      cy.get('.modal input').first().type('Negocio sin categoría')
      cy.get('.btn-submit').click()
      cy.get('.form-error').should('be.visible')
    })

    it('muestra error si la descripción tiene menos de 20 caracteres', () => {
      cy.get('.modal input').first().type('Negocio Test')
      cy.get('.modal select').first().select('Alimentos')
      cy.get('.modal textarea').type('Muy corta')
      cy.get('.btn-submit').click()
      cy.get('.form-error')
        .should('be.visible')
        .and('contain.text', '20 caracteres')
    })

    it('no muestra error cuando nombre, categoría y descripción son válidos', () => {
      cy.get('.modal input').first().type('Negocio Válido')
      cy.get('.modal select').first().select('Tecnología')
      cy.get('.modal textarea').type('Esta es una descripción suficientemente larga para pasar la validación mínima.')
      cy.get('.btn-submit').click()
      cy.get('.form-error').should('not.exist')
    })

  })

  // ── Bloque 2: Límites de caracteres ──────────────────────
  describe('Límites de caracteres por campo', () => {

    it('el campo nombre no acepta más de 80 caracteres', () => {
      const texto80  = 'A'.repeat(80)
      const textoExtra = texto80 + 'EXTRA'
      cy.get('.modal input').first().type(textoExtra)
      cy.get('.modal input').first()
        .invoke('val')
        .should('have.length', 80)
    })

    it('el campo descripción no acepta más de 200 caracteres', () => {
      const texto200   = 'B'.repeat(200)
      const textoExtra = texto200 + 'EXTRA'
      cy.get('.modal textarea').type(textoExtra)
      cy.get('.modal textarea')
        .invoke('val')
        .should('have.length', 200)
    })

    it('el contador de descripción muestra 0/200 al inicio', () => {
      cy.get('.char-count').should('contain.text', '0/200')
    })

    it('el contador se actualiza correctamente al escribir', () => {
      const texto = 'Descripción de prueba para el contador'
      cy.get('.modal textarea').type(texto)
      cy.get('.char-count').should('contain.text', `${texto.length}/200`)
    })

    it('el contador cambia a color warning al superar 180 caracteres', () => {
      cy.get('.modal textarea').type('C'.repeat(185))
      cy.get('.char-count').should('have.class', 'warning')
    })

    it('el campo teléfono no acepta más de 7 dígitos', () => {
      cy.get('.phone-number').type('12345678')
      cy.get('.phone-number')
        .invoke('val')
        .should('have.length', 7)
    })

  })

  // ── Bloque 3: Restricción de tipo de dato ────────────────
  describe('Restricción de tipo de dato en el teléfono', () => {

    it('no acepta letras en el campo teléfono', () => {
      cy.get('.phone-number').type('abc')
      cy.get('.phone-number').invoke('val').should('eq', '')
    })

    it('no acepta caracteres especiales en el campo teléfono', () => {
      cy.get('.phone-number').type('!@#$%^&')
      cy.get('.phone-number').invoke('val').should('eq', '')
    })

    it('no acepta espacios en el campo teléfono', () => {
      cy.get('.phone-number').type('123 456')
      cy.get('.phone-number').invoke('val').should('not.contain', ' ')
    })

    it('sí acepta dígitos en el campo teléfono', () => {
      cy.get('.phone-number').type('1234567')
      cy.get('.phone-number').invoke('val').should('eq', '1234567')
    })

    it('el selector de prefijo contiene las 7 operadoras', () => {
      cy.get('.phone-prefix option').should('have.length', 7)
    })

    it('se puede cambiar el prefijo telefónico', () => {
      cy.get('.phone-prefix').select('0412')
      cy.get('.phone-prefix').should('have.value', '0412')
      cy.get('.phone-prefix').select('0271')
      cy.get('.phone-prefix').should('have.value', '0271')
    })

  })

  // ── Bloque 4: Selectores de ubicación ────────────────────
  describe('Selectores de ubicación (Municipio / Parroquia)', () => {

    it('la parroquia está deshabilitada si no se ha seleccionado municipio', () => {
      cy.get('.form-row select').eq(1).should('be.disabled')
    })

    it('la parroquia se habilita al seleccionar un municipio', () => {
      cy.get('.form-row select').first().select('Valera')
      cy.get('.form-row select').eq(1).should('not.be.disabled')
    })

    it('al cambiar de municipio la parroquia se resetea', () => {
      cy.get('.form-row select').first().select('Valera')
      cy.get('.form-row select').eq(1).select('Matriz')
      cy.get('.form-row select').first().select('Boconó')
      // Al cambiar municipio la parroquia no debe tener el valor anterior
      cy.get('.form-row select').eq(1).should('not.have.value', 'Matriz')
    })

  })

  // ── Bloque 5: Selector de días y horario ─────────────────
  describe('Selector de días y horario', () => {

    it('los 7 días de la semana están presentes', () => {
      cy.get('.day-chip').should('have.length', 7)
    })

    it('un día se activa al hacer clic', () => {
      cy.get('.day-chip').contains('Lun').click()
      cy.get('.day-chip').contains('Lun').should('have.class', 'active')
    })

    it('un día se desactiva al hacer clic de nuevo', () => {
      cy.get('.day-chip').contains('Lun').click()
      cy.get('.day-chip').contains('Lun').click()
      cy.get('.day-chip').contains('Lun').should('not.have.class', 'active')
    })

    it('se pueden seleccionar varios días simultáneamente', () => {
      cy.get('.day-chip').contains('Lun').click()
      cy.get('.day-chip').contains('Mié').click()
      cy.get('.day-chip').contains('Vie').click()
      cy.get('.day-chip.active').should('have.length', 3)
    })

    it('los campos de hora apertura y cierre aceptan valores de tiempo', () => {
      cy.get('input[type="time"]').eq(0).invoke('val').should('not.be.empty')
      cy.get('input[type="time"]').eq(1).invoke('val').should('not.be.empty')
    })

  })

  // ── Bloque 6: Envío exitoso del formulario ───────────────
  describe('Envío del formulario completo', () => {

    it('envía correctamente con todos los campos válidos y muestra éxito', () => {
      const nombre = `Test Cypress ${Date.now()}`

      // Campos obligatorios
      cy.get('.modal input').first().type(nombre)
      cy.get('.modal select').first().select('Tecnología')
      cy.get('.modal textarea').type(
        'Negocio de prueba creado automáticamente por Cypress para validar el formulario completo.'
      )

      // Ubicación
      cy.get('.form-row select').first().select('Valera')
      cy.get('.form-row select').eq(1).select('Matriz')
      cy.get('input[placeholder*="estadio"]').type('Frente a la plaza principal')

      // Teléfono
      cy.get('.phone-prefix').select('0414')
      cy.get('.phone-number').type('1234567')

      // Días y horario
      cy.get('.day-chip').contains('Lun').click()
      cy.get('.day-chip').contains('Vie').click()
      cy.get('input[type="time"]').eq(0).invoke('val').should('not.be.empty')

      // URL foto
      cy.get('input[type="url"]').type('https://placehold.co/400x300')

      // Enviar
      cy.get('.btn-submit').click()

      // Debe mostrar estado de éxito
      cy.get('.modal-success', { timeout: 8000 }).should('be.visible')
      cy.get('.modal-success h3').should('contain.text', 'registrado')
    })

    it('el modal se cierra automáticamente tras el éxito', () => {
      const nombre = `Test Auto-Close ${Date.now()}`

      cy.get('.modal input').first().type(nombre)
      cy.get('.modal select').first().select('Alimentos')
      cy.get('.modal textarea').type(
        'Descripción válida para test de cierre automático del modal tras el envío exitoso.'
      )
      cy.get('.btn-submit').click()

      cy.get('.modal-success', { timeout: 8000 }).should('be.visible')
      // El modal se cierra solo después de 1.2s
      cy.get('.modal', { timeout: 5000 }).should('not.exist')
    })

  })

})
