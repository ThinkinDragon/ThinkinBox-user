import { Easing, Tween, update } from "@tweenjs/tween.js";

export function useMapAnimation(map: google.maps.Map, center: google.maps.LatLng,speed:number = 1000) {
  let cameraOptions: google.maps.CameraOptions = {
    zoom: 3,
    center: center,
  };
  // install Tweenjs with npm i @tweenjs/tween.js
  new Tween(cameraOptions) // Create a new tween that modifies 'cameraOptions'.
    .to({ zoom: 18, center }, speed) // Move to destination in 15 second.
    .easing(Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
    .onUpdate(() => {
      map.moveCamera(cameraOptions);
    })
    .start(); // Start the tween immediately.

  // Setup the animation loop.
  function animate(time: number) {
    requestAnimationFrame(animate);
    update(time);
  }

  requestAnimationFrame(animate);
}
