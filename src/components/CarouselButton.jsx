import '../components/HomeMap.css';

function CarouselButton() {

  const BASE_URL = 'https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net';

  return (
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></button>
  );
}

export default CarouselButton