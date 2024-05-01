{{flutter_js}}
{{flutter_build_config}}

let landingUi = document.querySelector('#landing_ui');
let startButton = document.querySelector('#start_button');
let isLoading = true;
startButton.textContent = "Loading...";

let loadingPromise = new Promise((resolve) => {
  _flutter.loader.load({
    onEntrypointLoaded: async function(engineInitializer) {
      const appRunner = await engineInitializer.initializeEngine();
      startButton.textContent = "Start";
      isLoading = false;
      resolve(appRunner);
    }
  });
});

let clicked = false;

startButton.addEventListener('click', () => {
  if (isLoading || clicked) {
    // Prevent premature and duplicate clicks.
    return;
  }

  landingUi.remove();
  clicked = true;
  loadingPromise.then(async (appRunner) => {
    await appRunner.runApp();
  });
});
