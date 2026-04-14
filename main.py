from fastapi import FastAPI
from model import Product
app = FastAPI()

@app.get("/")
def greet():
    return 'welcome'

products=[
    Product(id=1, name='laptop', description='a good laptop', price=1000.0, quantity=10),
    Product(id=2, name='phone', description='a good phone', price=500.0, quantity=20),
    Product(id=3, name='tablet', description='a good tablet', price=300.0, quantity=15),
    Product(id=4, name='monitor', description='a good monitor', price=200.0, quantity=5),
]
@app.get("/product")
def greet():
    return products

@app.get("/products/{product_id}")
def get_product_by_id(product_id: int):
    for product in products:
        if product.id == product_id:
            return product
    return 'product not found'
@app.post('/products')
def add_product(product:Product):
    products.append(product)
    return product