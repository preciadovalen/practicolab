
var carrito = [];
var totalCarrito = 0;


function irAlMenu() {
    window.location.href = "menu.html";
}

function reservar() {
    var nombre = document.getElementById("res-nombre").value;
    var telefono = document.getElementById("res-telefono").value;
    var personas = document.getElementById("res-personas").value;

    if (nombre == "" || telefono == "" || personas == "") {
        document.getElementById("resultado-reserva").textContent = "⚠️ Por favor completá todos los campos.";
    } else {
        document.getElementById("resultado-reserva").textContent = "✅ Reserva recibida para " + nombre + " (" + personas + " personas). Te llamamos al " + telefono + " para confirmar!";
    }
}

function limpiarReserva() {
    document.getElementById("res-nombre").value = "";
    document.getElementById("res-telefono").value = "";
    document.getElementById("res-personas").value = "";
    document.getElementById("resultado-reserva").textContent = "";
}



function agregarAlCarrito(nombre, precio) {
    
    var carritoGuardado = localStorage.getItem("carritoItems");
    var totalGuardado = localStorage.getItem("carritoTotal");

    if (carritoGuardado != null) {
        carrito = JSON.parse(carritoGuardado);
        totalCarrito = parseInt(totalGuardado);
    }


    carrito.push(nombre + " - $" + precio);
    totalCarrito = totalCarrito + precio;

    
    localStorage.setItem("carritoItems", JSON.stringify(carrito));
    localStorage.setItem("carritoTotal", totalCarrito);

    document.getElementById("resultado-menu").textContent = "✅ ¡" + nombre + " agregada al carrito!";
}

 

function mostrarCarrito() {
    var carritoGuardado = localStorage.getItem("carritoItems");
    var totalGuardado = localStorage.getItem("carritoTotal");

    if (carritoGuardado != null && carritoGuardado != "[]") {
        carrito = JSON.parse(carritoGuardado);
        totalCarrito = parseInt(totalGuardado);

        var texto = "";
        for (var i = 0; i < carrito.length; i++) {
            texto = texto + "🍕 " + carrito[i] + "\n";
        }

        document.getElementById("items-carrito").textContent = texto;
        document.getElementById("total-carrito").textContent = "TOTAL: $" + totalCarrito;
    }
}

function vaciarCarrito() {
    localStorage.removeItem("carritoItems");
    localStorage.removeItem("carritoTotal");
    carrito = [];
    totalCarrito = 0;
    document.getElementById("items-carrito").innerHTML = 'Tu carrito está vacío. <a href="menu.html">Ver menú</a>';
    document.getElementById("total-carrito").textContent = "";
    document.getElementById("resultado-pedido").textContent = "";
}

function confirmarPedido() {
    var nombre = document.getElementById("ped-nombre").value;
    var direccion = document.getElementById("ped-direccion").value;
    var telefono = document.getElementById("ped-telefono").value;
    var pago = document.getElementById("ped-pago").value;

    var carritoGuardado = localStorage.getItem("carritoItems");
    if (carritoGuardado == null || carritoGuardado == "[]") {
        document.getElementById("resultado-pedido").textContent = "⚠️ Tu carrito está vacío. Agregá pizzas desde el menú.";
        return;
    }

    if (nombre == "" || direccion == "" || telefono == "" || pago == "") {
        document.getElementById("resultado-pedido").textContent = "⚠️ Por favor completá todos los campos del formulario.";
    } else {
        document.getElementById("resultado-pedido").textContent =
            "✅ ¡Pedido confirmado! \n" +
            "👤 Cliente: " + nombre + "\n" +
            "📍 Dirección: " + direccion + "\n" +
            "📞 Teléfono: " + telefono + "\n" +
            "💳 Pago: " + pago + "\n" +
            "🕐 Tiempo estimado: 25-30 minutos.";

        vaciarCarrito();
    }
}

function limpiarFormulario() {
    document.getElementById("ped-nombre").value = "";
    document.getElementById("ped-direccion").value = "";
    document.getElementById("ped-telefono").value = "";
    document.getElementById("ped-pago").value = "";
    document.getElementById("ped-comentarios").value = "";
    document.getElementById("resultado-pedido").textContent = "";
}


if (document.getElementById("items-carrito") != null) {
    mostrarCarrito();
}