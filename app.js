const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragmento = document.createDocumentFragment();

//-------------------------------------------Creación del objeto carrito

let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

//-------------------------------------------Evento on click
items.addEventListener('click', e => {
    addCarrito(e);
});

//-------------------------------------------Agregar los datos api json

const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        console.log(data);
        mostrarProductos(data);
    } catch (error) {
        console.log(error);
    }
};

//-------------------------------------------Método Mostrar Producto
const mostrarProductos = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl);
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;
        const clone = templateCard.cloneNode(true);
        fragmento.appendChild(clone);
    });
    items.appendChild(fragmento);
};

//-------------------------------------------Salida al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
};

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent, 
        precio: objeto.querySelector('p').textContent,
    };
    //--------------------------------------Si existe el registro con el ID
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = { ...producto };
    console.log(carrito);
};
 