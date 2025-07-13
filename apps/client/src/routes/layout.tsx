// src/routes/layout.tsx - Root Layout
import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>



      <main>
        <Slot />
      </main>
    </>
  );
});