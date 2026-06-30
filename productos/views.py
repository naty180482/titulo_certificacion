from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.db.models import Q
from .models import Producto, Categoria
from .forms import ProductoForm

# RUTA: / (listar_productos)
def listar_productos(request):
    productos = Producto.objects.all().order_by('-fecha_creacion')
    
    # Búsqueda por nombre o descripción
    busqueda = request.GET.get('busqueda')
    if busqueda:
        productos = productos.filter(
            Q(nombre__icontains=busqueda) | 
            Q(descripcion__icontains=busqueda)
        )
    
    # Filtro por categoría
    categoria_id = request.GET.get('categoria')
    if categoria_id:
        productos = productos.filter(categoria_id=categoria_id)
    
    # Ordenar por precio
    orden = request.GET.get('orden')
    if orden == 'precio_asc':
        productos = productos.order_by('precio')
    elif orden == 'precio_desc':
        productos = productos.order_by('-precio')
    
    categorias = Categoria.objects.all()
    
    return render(request, 'productos/listar.html', {
        'productos': productos,
        'categorias': categorias,
        'busqueda': busqueda,
        'categoria_id': categoria_id,
        'orden': orden,
    })

# RUTA: /crear/ (crear_producto)
def crear_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, '✅ Producto creado exitosamente.')
            return redirect('listar_productos')
        else:
            messages.error(request, '❌ Error al crear el producto. Revisa los campos.')
    else:
        form = ProductoForm()
    
    return render(request, 'productos/formulario.html', {'form': form, 'titulo': 'Crear Producto'})

# RUTA: /editar/<id>/ (editar_producto)
def editar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    
    if request.method == 'POST':
        form = ProductoForm(request.POST, instance=producto)
        if form.is_valid():
            form.save()
            messages.success(request, f'✅ Producto "{producto.nombre}" actualizado correctamente.')
            return redirect('listar_productos')
        else:
            messages.error(request, '❌ Error al actualizar el producto.')
    else:
        form = ProductoForm(instance=producto)
    
    return render(request, 'productos/formulario.html', {'form': form, 'titulo': 'Editar Producto', 'producto': producto})

# RUTA: /eliminar/<id>/ (eliminar_producto)
def eliminar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    
    if request.method == 'POST':
        nombre_producto = producto.nombre
        producto.delete()
        messages.success(request, f'✅ Producto "{nombre_producto}" eliminado correctamente.')
        return redirect('listar_productos')
    
    return render(request, 'productos/confirmar_eliminar.html', {'producto': producto})