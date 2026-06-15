const app = document.querySelector<HTMLElement>('#app');

if (app) {
  app.innerHTML = `
    <section class="popup">
      <h1>CRXJS Resolve Example</h1>
      <p>Popup entry built by Vite and packaged by CRXJS.</p>
      <code>src/content-script.ts</code>
    </section>
  `;
}
