# FMR

Face mask recognition and temperature detection module for Raspberry Pi using p5.js, ml5.js and Vue.js.

## Description

This module can distinguish between face masks worn correctly and incorrectly, as well as people not wearing a face mask at all. After analyzing the images, the module then classifies them in three different categories:

- Face mask worn correctly
- Face mask worn incorrectly
- Without mask

The results are then displayed in a browser alongside the camera input.

## Project setup

Install all the required NPM packages:
```
npm install
```

You can now run the development server:

```
npm run serve
```

Or compile and minify the project for production deployment:

```
npm run build
```

## License

This project is distributed under the [MIT License](https://opensource.org/licenses/MIT). For more information, please refer to the [LICENSE](https://github.com/albertonl/fmr/blob/main/LICENSE) file in this repository.
