// Function to generate a random number within a range
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create a star element
export function createStar(): HTMLDivElement {
  const star: HTMLDivElement = document.createElement('div');
  star.className = 'star';

  // Set random position, size, and opacity for the star
  const xPos: number = getRandomInt(0, window.innerWidth);
  const yPos: number = getRandomInt(0, window.innerHeight);
  const size: number = getRandomInt(1, 3);
  const opacity: number = Math.random();

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${xPos}px`;
  star.style.top = `${yPos}px`;
  star.style.opacity = `${opacity}`;
  star.dataset.originalOpacity = `${opacity}`; // Store the original opacity in a custom data attribute

  return star;
}

// Function to generate stars and add them to the body
export function createStars(): void {
  const numStars: number = Math.round(
    (window.innerWidth * window.innerHeight) / 7000,
  ); // Adjust star density based on screen size

  for (let i = 0; i < numStars; i++) {
    const star = createStar();
    document.body.appendChild(star);
  }
}

// Update star brightness and add glow effect on hover
export function updateStarAppearance(event: MouseEvent): void {
  const stars: NodeListOf<HTMLDivElement> = document.querySelectorAll('.star');

  stars.forEach((star) => {
    const rect = star.getBoundingClientRect();
    const distance = Math.sqrt(
      (event.clientX - rect.left) ** 2 + (event.clientY - rect.top) ** 2,
    );
    const maxDistance = 30; // Maximum distance for full brightness
    star.style.transition = 'opacity 0.2s ease-out, box-shadow 0.2s ease-out'; // Smooth transition for opacity and box-shadow changes
    const width = star.style.width.replace('px', '');
    const glowStrength = Number(width) * 0.7;

    // Retrieve the original opacity from the custom data attribute
    const originalOpacity = parseFloat(star.dataset.originalOpacity || '0');

    // Adjust star brightness based on distance to the mouse cursor
    if (distance < maxDistance) {
      star.style.opacity = `1`;
      star.style.boxShadow = `rgba(255, 255, 255) 0 0 ${glowStrength * 2}px ${glowStrength}px`;
    } else {
      star.style.opacity = `${originalOpacity}`;
      star.style.boxShadow = '0 0 0 0 rgba(255, 255, 255)';
    }
  });
}
