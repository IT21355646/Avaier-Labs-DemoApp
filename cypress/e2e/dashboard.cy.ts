/// <reference types="cypress" />

describe("DemoApp E2E Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Update if hosted differently
  });

  it("should update center pane when borrower is selected", () => {
    cy.get('[data-testid="borrower-card-1"]').click();
    cy.get('[data-testid="borrower-name"]').should("contain", "Sarah Dunn");
  });

  it("should expand and collapse AI Explainability section", () => {
    cy.get('[data-testid="borrower-card-1"]').click();
    
    // Verify AI explainability section is initially open and content exists
    cy.get('[data-testid="toggle-explain"]').should('exist');
    cy.get('[data-testid="ai-flag-0"]').should('exist');
    
    // Collapse the section
    cy.get('[data-testid="toggle-explain"]').click();
    
    // Check that AI flags don't exist when collapsed
    cy.get('[data-testid="ai-flag-0"]').should("not.exist");

    // Expand again
    cy.get('[data-testid="toggle-explain"]').click();
    
    // Check that AI flags exist when expanded
    cy.get('[data-testid="ai-flag-0"]').should("exist");
  });

  it("should log console outputs when action buttons clicked", () => {
    cy.get('[data-testid="borrower-card-1"]').click();

    cy.window().then((win) => {
      cy.stub(win.console, "log").as("consoleLog");
    });

    cy.get('[data-testid="request-documents"]').click();
    cy.get("@consoleLog").should("be.calledWithMatch", /📤 Requested documents/);

    cy.get('[data-testid="send-valuer"]').click();
    cy.get("@consoleLog").should("be.calledWithMatch", /📤 Sent to valuer/);

    cy.get('[data-testid="approve-loan"]').click();
    cy.get("@consoleLog").should("be.calledWithMatch", /✅ Loan approved/);

    // Check if escalate button is enabled before clicking
    cy.get('[data-testid="escalate-committee"]').then(($btn) => {
      if (!$btn.prop('disabled')) {
        cy.get('[data-testid="escalate-committee"]').click();
        cy.get("@consoleLog").should("be.calledWithMatch", /⚠️ Escalated borrower/);
      }
    });
  });

  it("should conditionally enable escalate button based on risk factors", () => {
    // Test with borrower-1 which should have escalate enabled for testing
    cy.get('[data-testid="borrower-card-1"]').click();
    cy.get('[data-testid="escalate-committee"]').should('not.be.disabled');
  });
});
