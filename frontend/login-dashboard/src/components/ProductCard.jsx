function ProductCard({ name, price }) {
  return (
    <div className="product-card">
      <div className="product-image">👕</div>
      <h3>{name}</h3>
      <p>Rp {price}</p>
      <button>Beli</button>
    </div>
  );
}

export default ProductCard;
