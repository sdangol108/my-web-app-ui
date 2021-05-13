
 const Navigation = {
    template: `
        <nav style="display:inline-block">
            <div class="list-group nav-menu text-left" style="width:100px">
                <router-link class="nav-link" to="/">
                    <a class="list-group-item" >RESERVATIONS</a>
                </router-link>
                <router-link class="nav-link" to="inventory">
                    <a class="list-group-item" >INVENTORY</a>
                </router-link>
                <router-link class="nav-link" to="viewInventory">
                    <a class="list-group-item" >VIEW INVENTORY</a>
                </router-link>
            </div>
        </nav>
    `,
    computed: {
      
    },
  };
  