# TOPTEN — Cinematic 3D Ranking Universe

> A luxury scroll-driven 3D experience. Not a website — a journey.

## Stack

- **React 18** + **Vite 5**
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — helpers (Environment, etc.)
- **Three.js r164**
- **GSAP 3** — transition animations
- **Lenis** — smooth inertial scroll

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173
```

---

## Project Structure

```
toptenteh/
├── index.html                  ← entry point
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                ← React root
    ├── App.jsx                 ← scroll logic, UI overlays, Lenis
    ├── Scene.jsx               ← Canvas, lights, camera rig, morphing
    ├── data.js                 ← all 8 categories + rankings
    ├── styles.css              ← full luxury dark stylesheet
    └── objects/
        ├── Burger.jsx          ← Restaurants
        ├── Hotel.jsx           ← Hotels
        ├── TennisBall.jsx      ← Sports Centers
        ├── CoffeeCup.jsx       ← Cafes
        ├── LuxuryCar.jsx       ← Car Dealers
        ├── LuxuryHouse.jsx     ← Real Estate
        ├── Airplane.jsx        ← Travel Agencies
        ├── Diamond.jsx         ← Shopping Centers
        └── Particles.jsx       ← ambient particle field
```

---

## How It Works

### Scroll → Category Mapping
Lenis fires scroll events. `App.jsx` maps scroll `progress` (0–1) to category index (0–7).
Each index swap triggers GSAP morph animations in `Scene.jsx`.

### Object Morphing
`MorphGroup` in `Scene.jsx` holds refs to current + next object.
On category change:
1. Current object spins + scales to zero (`back.in` easing)
2. Next object scales from zero (`elastic.out` easing) + unwraps rotation

### Dynamic Lighting
`SceneLights` takes `accentColor` from the active category.
GSAP tweens the fill point-light color on every category transition.

### Camera Rig
`CameraRig` applies a slow sinusoidal drift to `camera.position` and triggers
a cinematic reposition (`gsap.to`) on each category change.

---

## Adding / Editing Categories

Edit `src/data.js`:

```js
{
  id: 'gyms',
  name: 'Gyms',
  eyebrow: 'Top Ten',
  subtitle: 'The finest fitness studios worldwide.',
  accentColor: '#ff6040',   // changes particle + light color
  lightColor: '#ff4020',
  object: 'ball',           // references which 3D object to show
  rankings: [
    { name: 'Gold\'s Gym Venice', location: 'Los Angeles, USA' },
    ...
  ],
}
```

Then add a new `object` key → component mapping in `Scene.jsx`:

```js
const OBJECTS = [..., YourNewComponent]
```

---

## Adding GLTF Models (V2 Upgrade)

Replace any procedural object with a real `.glb` model:

```jsx
import { useGLTF } from '@react-three/drei'

export default function MyModel() {
  const { scene } = useGLTF('/models/burger.glb')
  return <primitive object={scene} />
}
```

Place models in `public/models/`. Preload with:
```js
useGLTF.preload('/models/burger.glb')
```

---

## V2 Roadmap

- [ ] Real GLTF meshes with PBR textures
- [ ] GPGPU particle explosion on transition
- [ ] Cinematic GSAP timeline camera path
- [ ] `@react-three/postprocessing` — depth of field + bloom
- [ ] Sound design — spatial audio with Howler.js
- [ ] Hover-reveal ranking details
- [ ] Mobile touch drag support
- [ ] CMS integration (Sanity / Contentful)

---

## Deploy

```bash
npm run build
# Output → dist/
```

Upload `dist/` to:
- **Vercel**: `npx vercel --prod`
- **Netlify**: drag & drop `dist/` to netlify.com
- **GitHub Pages**: `npx gh-pages -d dist`

Result:
```
https://toptenteh.vercel.app
```

---

## Performance Tips

- Reduce `Particles count` (default: 1800) on mobile
- Disable `Environment` preset and use manual lighting if HDRI is slow
- Use `<Suspense fallback={null}>` around heavy geometry components
- Enable `powerPreference: 'high-performance'` in Canvas gl props

---

## License

MIT — build something beautiful.
