# 🚀 DemoApp – Frontend Developer Assignment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## 🧱 Tech Stack

- **Framework**: React (Create React App)
- **Styling**: Tailwind CSS + [ShadCN UI](https://ui.shadcn.com)
- **Icons**: [Lucide Icons](https://lucide.dev)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Testing**: Cypress for end-to-end UI testing
- **Mock API**: In-memory functions in `services/api.ts`

---

## 📦 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

---

### `npm run test`

Runs unit or integration tests (currently minimal).\
End-to-end tests are handled via Cypress (see below).

---

### `npm run build`

Builds the app for production into the `build` folder.\
Optimized for performance and minified with hashed filenames.

---

### `npm run eject`

**Note:** This is a one-way operation and not recommended unless absolutely necessary.

---

## 🧪 End-to-End Testing with Cypress

### Run Cypress tests:

```bash
npx cypress open
# or
npx cypress run
