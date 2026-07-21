(function () {
  "use strict";

  function bootstrap() {
    if (!window.SoulCafeCore || typeof window.SoulCafeCore.initializeSoulCafeApp !== "function") {
      console.error("SoulCafeCore initializer is missing.");
      return;
    }

    window.SoulCafeCore.initializeSoulCafeApp();
  }

  bootstrap();
})();
