<template>
  <div>
    <a class="skip-link" href="#main">Skip to content</a
    ><NuxtLoadingIndicator color="#dfff00" /><SiteHeader />
    <main id="main"><NuxtPage /></main>
    <SiteFooter /><ClientOnly><CartDrawer /></ClientOnly>
  </div>
</template>
