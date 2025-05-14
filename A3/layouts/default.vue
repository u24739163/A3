<!-- u24739163 Mulondi Makhado -->
<template> 
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #d2aa97 !important;">
        <div class="container-fluid" style="background-color: #d2aa97;">
          <a class="navbar-brand" href="/">
            <img src="../Images/sudo.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
            Sudo Blogs
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NuxtLink class="nav-link" aria-current="page" to="/">Home</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/SearchPage">Search</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <slot/>
    </div>
  </template>
  
  <style scoped>
  .navbar-brand, .nav-link {
    color: rgb(255, 244, 231)  !important;
  }
  
  .nav-link.router-link-active {
    font-weight: bold;
    text-decoration: underline;
  }
  </style>