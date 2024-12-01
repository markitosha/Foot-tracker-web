# Project Documentation

## About the Project

This project is a video player application built using TypeScript, React, and Video.js. It includes custom utilities and
configurations to manage video playback and display. The project is designed to be responsive and adaptable to different
screen sizes.

**Link to Deploy:** https://foot-tracker-web.vercel.app/

## How to Launch Project Locally and Then Launch

To build and launch the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/markitosha/Foot-tracker-web.git
    cd Foot-tracker-web
    ```

2. **Install dependencies:**
    ```bash
    yarn install
    ```

3. **Build the project for production:**
    ```bash
    yarn build
    ```

4. **Launch the project:**
    ```bash
    yarn start
    ```

## How to Launch Project for Development

To launch the project for development, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/markitosha/Foot-tracker-web.git
    cd Foot-tracker-web
    ```

2. **Install dependencies:**
    ```bash
    yarn install
    ```

3. **Start the development server:**
    ```bash
    yarn dev
    ```

## Architecture

The project is structured as follows:

- **`src/`**: Contains the source code for the application.
    - **`components/`**: Contains React components.
    - **`contexts/`**: Contains data providers.
    - **`utils/`**: Contains utility functions.
- **`tailwind.config.js`**: Configuration file for Tailwind CSS.
- **`index.html`**: The main HTML file for the application.

### Data Sources

The project uses three contexts:

1. **`VideoContext`**: Loaded video src url and video element reference.
2. **`JsonContext`**: Downloaded json file and parsed json data. Also contains history of the changes to the Json.
3. **`TracksContext`**: Contains derivative data from the json file, such as the track (list of coordinates) that picked
   as a main track, list of candidates, candidate track, etc.

### Explanation about Video-Canvas Hack

The `Video.tsx` component includes a hack to manage the video element under the canvas element. This is done by manually
adding the canvas element after the video element to reuse the player used in the previous version of the project.
Otherwise, it would be necessary to rewrite the entire player. All control elements should be ABOVE the canvas, and the
canvas should be ABOVE the video.

```typescript
// Example of the hack in Video.tsx
if (canvasRef.current) {
    videoRef.current?.after(canvasRef.current);
    updateCanvas();
}
```

**Recommendation:** Implement your own video player to properly integrate with the canvas element without relying on
hacks. This will improve the code quality and maintainability of the project.