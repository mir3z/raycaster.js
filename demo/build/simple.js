!function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="/build/",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var i=r(2),o=n(i),a=r(17),u=n(a),c=r(15),l=n(c),f=r(23),s=n(f),h=document.querySelector("#screen"),d=new o.default(h),y=(0,u.default)(window).init(),v=new l.default;(0,s.default)(d,v,y)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.CIRCLE=360,n=t.CIRCLE_1_2=r/2,i=t.CIRCLE_1_4=r/4,o=(t.CIRCLE_3_4=3*i,t.BLOCK_SIZE=64,t.normDeg=function(e){var t=e%r;return t<0?t+r:t},t.trunc=function(e){return Math.floor(e)},t.rad=function(e){return e*Math.PI/n+.001});t.sin=function(e){return Math.sin(o(e))},t.cos=function(e){return Math.cos(o(e))},t.tan=function(e){return Math.tan(o(e))}},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(t){r(this,e),this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.ctx.msImageSmoothingEnabled=!1,this.ctx.mozImageSmoothingEnabled=!1,this.ctx.imageSmoothingEnabled=!1}return n(e,[{key:"viewport",value:function(){var e=this.canvas,t=e.width,r=e.height;return{width:t,height:r}}},{key:"color",value:function(e){this.ctx.fillStyle=e}},{key:"text",value:function(e){var t=this,r=e.x,n=e.y,i=e.text,o=e.font;this.perform(function(){t.ctx.font=o,t.ctx.fillText(i,r,n)})}},{key:"rect",value:function(e){var t=e.x,r=e.y,n=e.width,i=e.height;this.ctx.fillRect(t,r,n,i)}},{key:"alpha",value:function(e){this.ctx.globalAlpha=e}},{key:"drawImage",value:function(e,t,r){this.ctx.drawImage(e,t.x,t.y,t.width,t.height,r.x,r.y,r.width,r.height)}},{key:"createBuffer",value:function(){var e=this.ctx.createImageData(this.canvas.width,this.canvas.height);return new o(e)}},{key:"flushBuffer",value:function(e){this.ctx.drawImage(e.flush(),0,0)}},{key:"createLayer",value:function(){return new e(a(this.canvas))}},{key:"composeLayer",value:function(e,t,r){t&&r?this.ctx.drawImage(e.canvas,t.x,t.y,t.width,t.height,r.x,r.y,r.width,r.height):t?this.ctx.drawImage(e.canvas,t.x,t.y,t.width,t.height):this.ctx.drawImage(e.canvas,0,0)}},{key:"perform",value:function(e){this.ctx.save(),e(this),this.ctx.restore()}},{key:"clear",value:function(){var e=this;this.perform(function(){e.ctx.clearRect(0,0,e.canvas.width,e.canvas.height)})}}]),e}(),o=function(){function e(t){r(this,e),this.imageData=t;var n=this.imageData.data.buffer;this.buffer8=new Uint8ClampedArray(n,0,n.byteLength),this.buffer32=new Uint32Array(n)}return n(e,[{key:"putPixel",value:function(e,t){var r=e.x,n=e.y,i=t.r,o=t.g,a=t.b,u=t.a;this.buffer32[n*this.imageData.width+r]=u<<24|a<<16|o<<8|i}},{key:"flush",value:function(){this.imageData.data.set(this.buffer8);var e=a(this.imageData);return e.getContext("2d").putImageData(this.imageData,0,0),e}}]),e}(),a=t.createCanvas=function(e){var t=e.width,r=e.height,n=document.createElement("canvas");return n.width=t,n.height=r,n};t.readImageData=function(e){var t=a(e),r=t.getContext("2d");return r.drawImage(e,0,0),r.getImageData(0,0,e.width,e.height)};t.default=i},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e){var t=e.replace(/[^0-9A-F]/gi,"");return 3===t.length&&(t=t.split("").map(function(e){return e+e}).join("")),parseInt(t,16)}function i(e){return{r:e>>16&255,g:e>>8&255,b:255&e}}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:255;r(this,e),this.r=t,this.g=n,this.b=i,this.a=o}return o(e,[{key:"multiply",value:function(t){return new e(this.r*t,this.g*t,this.b*t)}},{key:"toString",value:function(){return"rgba("+this.r+","+this.g+","+this.b+","+this.a}}],[{key:"fromRGB",value:function(t){var r=t.r,n=t.g,i=t.b,o=t.a;return new e(r,n,i,o)}},{key:"fromHex",value:function(t){return e.fromRGB(i(n(t)))}}]),e}();t.default=a},function(e,t,r){"use strict";function n(e){var t=function(t){for(var r=t.x0,n=t.y0,o=t.dx,a=t.dy,u=t.limit,c=void 0===u?20:u,l=0;l<c;++l){var f=r+l*o,s=n+l*a,h=(0,i.trunc)(f/i.BLOCK_SIZE),d=(0,i.trunc)(s/i.BLOCK_SIZE);if(e(h,d))return{x:f,y:s}}return{x:Number.MAX_VALUE,y:Number.MAX_VALUE}};return function(e){var r=e.x,n=e.y,c=e.angle,l=(0,i.normDeg)(c),f=o(r,n,l,i.BLOCK_SIZE),s=a(r,n,l,i.BLOCK_SIZE),h=[];if(f){var d=t(f);d.vertical=!0,d.horizontal=!1,h.push(d)}if(s){var y=t(s);y.vertical=!1,y.horizontal=!0,h.push(y)}for(var v={x:null,y:null,distance:Number.MAX_VALUE},g=0,p=h.length;g<p;++g){var w=h[g],b=u(r,w.x,l);b<v.distance&&(v=w,v.distance=b)}return v}}Object.defineProperty(t,"__esModule",{value:!0}),t.createRaycaster=n;var i=r(1),o=function(e,t,r,n){if(0===r||r===i.CIRCLE_1_2)return null;var o=r>0&&r<i.CIRCLE_1_2,a=(0,i.trunc)(t/n)*n+(o?-.001:n),u=e+(t-a)/(0,i.tan)(r),c=o?-n:n,l=-c/(0,i.tan)(r);return{x0:u,y0:a,dx:l,dy:c}},a=function(e,t,r,n){if(r===i.CIRCLE_1_4||r===i.CIRCLE_3_4)return null;var o=r<i.CIRCLE_1_4||r>i.CIRCLE_3_4,a=(0,i.trunc)(e/n)*n+(o?n:-.001),u=t+(e-a)*(0,i.tan)(r),c=o?n:-n,l=-c*(0,i.tan)(r);return{x0:a,y0:u,dx:c,dy:l}},u=function(e,t,r){return Math.abs((e-t)/(0,i.cos)(r))}},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(1),a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.width,i=void 0===r?640:r,a=t.height,u=void 0===a?480:a,c=t.fov,l=void 0===c?60:c;n(this,e),this.width=i,this.height=u,this.fov=l,this.center={x:this.width/2,y:this.height/2},this.floorFactor=this.width/this.height*(0,o.cos)(this.fov/2)-.01,this.length=this.center.x/(0,o.tan)(this.fov/2),this.delta=this.fov/this.width,this.x=0,this.y=0,this.direction=0}return i(e,[{key:"setOrientation",value:function(e){var t=e.x,r=e.y,n=e.direction;this.x=t*o.BLOCK_SIZE,this.y=r*o.BLOCK_SIZE,this.direction=n}},{key:"viewport",value:function(){var e=this.width,t=this.height;return{width:e,height:t}}},{key:"render",value:function(e,t){var r=this.viewport(),n=t.getWall(),i=t.getFloor(),o=t.getSky();this.renderSky(o);for(var a=0;a<this.width;a+=1){var u=this.wallProjection(e,a);this.renderWall(u,n,t,a),this.renderFloor(u,i,t,a)}o.flush(r),n.flush(r),i.flush()}},{key:"renderWall",value:function(e,t,r,n){t.setRenderingStrategy(r.reconcileWall(e)).render(n,e)}},{key:"renderFloor",value:function(e,t,r,n){for(var i=e.wall.top+e.wall.height,o=e.viewport.height-i,a=i+o,u=i;u<a;u+=1){var c=this.floorProjection(e,u);t.setRenderingStrategy(r.reconcileFloor(c)).render(n,u,c)}}},{key:"renderSky",value:function(e){e.render({direction:this.direction,viewport:this.viewport()})}},{key:"wallProjection",value:function(e,t){var r=t*this.delta-.5*this.fov,n=this.direction-r,i=(0,o.cos)(r),a=e({x:this.x,y:this.y,angle:n}),u=a.distance*i,c=o.BLOCK_SIZE*this.length/u,l=this.center.y-c/2;return{from:{x:this.x,y:this.y,angle:this.direction},viewport:{width:this.width,height:this.height},wall:{x:a.x/o.BLOCK_SIZE,y:a.y/o.BLOCK_SIZE,horizontal:a.horizontal,vertical:a.vertical,top:l,height:c,distance:u}}}},{key:"floorProjection",value:function(e,t){var r=e.wall,n=e.from,i=r.top+r.height,a=this.height-i,u=i+a,c=n,l=u/(2*t-u),f=this.floorFactor*l/r.distance,s=c.x/o.BLOCK_SIZE+f*(r.x*o.BLOCK_SIZE-c.x),h=c.y/o.BLOCK_SIZE+f*(r.y*o.BLOCK_SIZE-c.y);return{floor:{x:s,y:h,distance:l}}}}]),e}();t.default=a},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){return e.multiply(t)}function c(e,t,r,n){return e.putPixel({x:t,y:r},n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.TexturedFloorRenderingStrategy=t.SolidFloorRenderingStrategy=t.FloorRenderingStrategy=t.Floor=void 0;var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),f=r(3),s=n(f),h=(t.Floor=function(){function e(t,r){a(this,e),this.renderer=t,this.renderingStrategy=r,this.buffer=this.renderer.createBuffer()}return l(e,[{key:"setRenderingStrategy",value:function(e){return this.renderingStrategy=e,this}},{key:"render",value:function(e,t,r){return this.renderingStrategy.render(this.buffer,e,t,r),this}},{key:"flush",value:function(){this.renderer.flushBuffer(this.buffer),this.buffer=this.renderer.createBuffer()}}]),e}(),t.FloorRenderingStrategy=function(){function e(){a(this,e)}return l(e,[{key:"render",value:function(e,t,r,n){}}]),e}());t.SolidFloorRenderingStrategy=function(e){function t(e,r){a(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.color=e,n.shader=r,n}return o(t,e),l(t,[{key:"render",value:function(e,t,r,n){var i=this.shader(n);c(e,t,~~r,u(this.color,i))}}]),t}(h),t.TexturedFloorRenderingStrategy=function(e){function t(e,r){a(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.texture=e,n.shader=r,n}return o(t,e),l(t,[{key:"render",value:function(e,t,r,n){var i=n.floor,o=i.x,a=i.y,l=o*this.texture.width%this.texture.width,f=a*this.texture.height%this.texture.height,h=s.default.fromRGB(this.texture.at(~~l,~~f)),d=this.shader(n);c(e,t,~~r,u(h,d))}}]),t}(h)},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(t){r(this,e),this.running=!1,this.raf=t}return n(e,[{key:"start",value:function(){this.running=!0,this.raf.request()}},{key:"stop",value:function(){this.running=!1,this.raf.cancel()}},{key:"loop",value:function(e){var t=this;this.stop();var r=0,n=function(n){if(t.running){var i=n-r;e(i,n),r=n,t.raf.request()}};this.raf.register(n)}}]),e}();t.default=i},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(t,n,i){r(this,e),this.map=t,this.renderer=n,this.assetStore=i,this.materials={},this.wall=null,this.floor=null,this.sky=null,this.setup(this.assetStore,this.renderer)}return n(e,[{key:"setup",value:function(){}},{key:"setWall",value:function(e){this.wall=e}},{key:"setFloor",value:function(e){this.floor=e}},{key:"setSky",value:function(e){this.sky=e}},{key:"getSky",value:function(){return this.sky}},{key:"getWall",value:function(){return this.wall}},{key:"getFloor",value:function(){return this.floor}},{key:"registerMaterial",value:function(e,t){this.materials[e]=t}},{key:"getMaterial",value:function(e){return this.materials[e]}},{key:"reconcileWall",value:function(){}},{key:"reconcileFloor",value:function(){}}]),e}();t.default=i},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(1),a=function(){function e(t){var r=t.width,i=t.height;n(this,e),this.width=r,this.height=i,this.grid=new Uint8Array(this.width*this.height)}return i(e,[{key:"at",value:function(e,t){return this.grid[(0,o.trunc)(e)+this.width*(0,o.trunc)(t)]}}],[{key:"fromGrid",value:function(t,r,n){if(t*r!==n.length)throw"Invalid map";var i=new e({width:t,height:r});return i.grid=Uint8Array.from(n),i}}]),e}();t.default=a},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){return{dx:(0,a.cos)(e)*t,dy:(0,a.sin)(e)*t}}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=r(1),u=3,c=function(){function e(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=r.x,o=void 0===i?0:i,a=r.y,u=void 0===a?0:a,c=r.direction,l=void 0===c?0:c,f=arguments[1];n(this,e),this.x=o,this.y=u,this.direction=l,this.collides=function(e,r){return f(t.x+e,t.y+r)}}return o(e,[{key:"moveForward",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=i(this.direction,e),r=t.dx,n=t.dy;this.move(r,-n)}},{key:"moveBackward",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=i(this.direction,e),r=t.dx,n=t.dy;this.move(-r,n)}},{key:"move",value:function(e,t){this.collides(e*u,0)||(this.x+=e),this.collides(0,t*u)||(this.y+=t)}},{key:"rotateLeft",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.rotate(e)}},{key:"rotateRight",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.rotate(-e)}},{key:"rotate",value:function(e){this.direction=(this.direction+e)%a.CIRCLE}},{key:"position",get:function(){var e=this.x,t=this.y,r=this.direction;return{x:e,y:t,direction:r}}}]),e}();t.default=c},function(e,t,r){"use strict";function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.TexturedSkyRenderingStrategy=t.SolidSkyRenderingStrategy=t.SkyRenderingStrategy=t.Sky=void 0;var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(1),c=(t.Sky=function(){function e(t,r){o(this,e),this.renderer=t,this.renderingStrategy=r,this.layer=this.renderer.createLayer()}return a(e,[{key:"setRenderingStrategy",value:function(e){return this.renderingStrategy=e,this}},{key:"render",value:function(e){var t=e.viewport;return this.viewport=t,this.renderingStrategy.render(this.layer,e),this}},{key:"flush",value:function(e){var t=e.width,r=e.height,n={x:0,y:0,width:t,height:r};this.renderer.composeLayer(this.layer,n,n),this.layer.clear()}}]),e}(),t.SkyRenderingStrategy=function(){function e(){o(this,e)}return a(e,[{key:"render",value:function(e,t){}}]),e}());t.SolidSkyRenderingStrategy=function(e){function t(e){o(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r.color=e,r}return i(t,e),a(t,[{key:"render",value:function(e,t){var r=t.viewport,n=r.width,i=r.height;e.color(this.color),e.rect({x:0,y:0,width:n,height:i})}}]),t}(c),t.TexturedSkyRenderingStrategy=function(e){function t(e){o(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r.texture=e,r}return i(t,e),a(t,[{key:"drawTextureTo",value:function(e,t){e.drawImage(this.texture.image,{x:0,y:0,width:this.texture.width,height:this.texture.height},t)}},{key:"render",value:function(e,t){var r=t.direction,n=t.viewport,i=n.height/this.texture.height,o=this.texture.width*i,a=this.texture.height*i,c=o*r/u.CIRCLE;this.drawTextureTo(e,{x:c,y:0,width:o,height:a}),c>0&&this.drawTextureTo(e,{x:c-o,y:0,width:o,height:a}),c+n.width<o&&this.drawTextureTo(e,{x:c+o,y:0,width:o,height:a})}}]),t}(c)},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(2),a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.width,i=t.height,o=t.path;n(this,e),this.width=r,this.height=i,this.path=o,this.image=new Image,this.imageData=null}return i(e,[{key:"load",value:function(){var e=this,t=function(t,r){e.image.onload=function(){return t(e)},e.image.onerror=function(e){return r(e)},e.image.src=e.path},r=function(e){return e.imageData=(0,o.readImageData)(e.image),e.data32=new Uint32Array(e.imageData.data.buffer),e};return new Promise(t).then(r)}},{key:"at",value:function(e,t){var r=this.data32[t*this.imageData.width+e];return{r:r>>0&255,g:r>>8&255,b:r>>16&255,a:r>>24&255}}}],[{key:"load",value:function(t){var r=new e({path:t});return r.load().then(function(e){return e.width=e.image.naturalWidth,e.height=e.image.naturalHeight,e})}}]),e}();t.default=a},function(e,t,r){"use strict";function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.SolidWallRenderingStrategy=t.TexturedWallRenderingStrategy=t.WallRenderingStrategy=t.Wall=void 0;var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(1),c=(t.Wall=function(){function e(t,r){o(this,e),this.renderer=t,this.renderingStrategy=r,this.layer=this.renderer.createLayer()}return a(e,[{key:"setRenderingStrategy",value:function(e){return this.renderingStrategy=e,this}},{key:"render",value:function(e,t){return this.renderingStrategy.render(this.layer,e,t),this}},{key:"flush",value:function(e){var t=e.width,r=e.height,n={x:0,y:0,width:t,height:r};this.renderer.composeLayer(this.layer,n,n),this.layer.clear()}}]),e}(),t.WallRenderingStrategy=function(){function e(t){o(this,e),this.shader=t}return a(e,[{key:"render",value:function(e,t,r){}}]),e}());t.TexturedWallRenderingStrategy=function(e){function t(e,r){o(this,t);var i=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,r));return i.texture=e,i}return i(t,e),a(t,[{key:"render",value:function(e,t,r){var n=this,i=r.wall,o=i.horizontal?i.y*u.BLOCK_SIZE%u.BLOCK_SIZE:i.x*u.BLOCK_SIZE%u.BLOCK_SIZE,a=1,c=this.texture.width/u.BLOCK_SIZE*o;c=Math.min(c,this.texture.width-a),c=Math.max(c-a,0),e.drawImage(this.texture.image,{x:c,y:0,width:a,height:this.texture.height},{x:t,y:i.top,width:a,height:i.height}),e.perform(function(e){e.color("#000"),e.alpha(1-n.shader({projection:r})),e.rect({x:t,y:i.top-.5,width:a,height:i.height+.5})})}}]),t}(c),t.SolidWallRenderingStrategy=function(e){function t(e,r){o(this,t);var i=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,r));return i.color=e,i}return i(t,e),a(t,[{key:"render",value:function(e,t,r){var n=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,o=r.wall;e.perform(function(e){e.color(n.color),e.rect({x:t,y:o.top,width:i,height:o.height})}),e.perform(function(e){e.color("#000"),e.alpha(1-n.shader({projection:r})),e.rect({x:t,y:o.top-.5,width:i,height:o.height+.5})})}}]),t}(c)},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(t){r(this,e),this.renderer=t,this.layer=this.renderer.createLayer(),this.fps=null}return n(e,[{key:"update",value:function(e){this.fps=e}},{key:"toString",value:function(){return(this.fps||0).toFixed(1)+" FPS"}},{key:"render",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.color,n=void 0===r?"white":r,i=t.font,o=void 0===i?"14px monospace":i,a=t.x,u=void 0===a?5:a,c=t.y,l=void 0===c?15:c;this.fps&&(this.layer.perform(function(t){t.clear(),t.color(n),t.text({x:u,y:l,text:e.toString(),font:o})}),this.renderer.composeLayer(this.layer))}}]),e}();t.default=i},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(t){r(this,e),this.register(t)}return n(e,[{key:"register",value:function(e){this.frame=e}},{key:"request",value:function(){this.frame&&window.requestAnimationFrame(this.frame)}},{key:"cancel",value:function(){this.frame&&window.cancelAnimationFrame(this.frame)}}]),e}();t.default=i},function(e,t){"use strict";function r(){var e={};return{load:function t(r){var n=function(t){return function(r){return e[t]=r}},t=function(e){var t=e.key,r=e.loader;return r().then(n(t))};return Promise.all(r.map(t))},provide:function(t){var r=e[t];if(!r)throw'No asset known as "'+t+'"';return r}}}Object.defineProperty(t,"__esModule",{value:!0}),t.createAssetStore=r},function(e,t){"use strict";function r(e){var t={},r={},c=function(e){return function(n){var i=n.keyCode;i in t&&(n.preventDefault(),n.stopPropagation(),r[i]=e)}},l=function(){for(var e=arguments.length,n=Array(e),i=0;i<e;i++)n[i]=arguments[i];return function(e){if(r[e]){var i;(i=t[e]).notify.apply(i,n)}}};return{init:function(){return e.addEventListener("keydown",c(!0),!1),e.addEventListener("keyup",c(!1),!1),this},notify:function e(){var e=l.apply(void 0,arguments);Object.keys(r).forEach(e)},register:function(e,r){return t[e]=t[e]||n(),t[e].register(r),this},onKeyLeft:function(e){return this.register(i,e)},onKeyRight:function(e){return this.register(o,e)},onKeyUp:function(e){return this.register(a,e)},onKeyDown:function(e){return this.register(u,e)}}}function n(){var e=[];return{register:function(t){e.push(t)},notify:function(){for(var t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];e.forEach(function(e){return e.apply(void 0,r)})}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=37,o=39,a=38,u=40},function(e,t){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:12,t=0;return{update:function(r){t+=(r-t)/e},get fps(){return 1e3/t}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},,,,function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(13),l=r(6),f=r(11),s=r(8),h=n(s),d=function(e){function t(){return i(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"setup",value:function(e,t){var r=function(e){var t=e.projection,r=t.wall.horizontal?1:.6;return Math.min(r/t.wall.distance*150,1)},n=function(e){var t=e.floor.distance;return 1/t},i=new c.TexturedWallRenderingStrategy(e.provide("BRICK"),r),o=new c.TexturedWallRenderingStrategy(e.provide("METAL"),r),a=new l.TexturedFloorRenderingStrategy(e.provide("STONE"),n),u=new l.TexturedFloorRenderingStrategy(e.provide("TILE"),n),s=new f.TexturedSkyRenderingStrategy(e.provide("SKY"));this.registerMaterial(0,a),this.registerMaterial(1,u),this.registerMaterial(2,o),this.registerMaterial(3,i),this.setSky(new f.Sky(t,s)),this.setWall(new c.Wall(t)),this.setFloor(new l.Floor(t))}},{key:"reconcileWall",value:function(e){var t=e.wall,r=t.x,n=t.y;return this.getMaterial(this.map.at(r,n))}},{key:"reconcileFloor",value:function(e){var t=e.floor,r=t.x,n=t.y;return this.getMaterial(this.map.at(r,n))}}]),t}(h.default);t.default=d},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t,r){function n(){var t=function(e){return function(t,r){return e.at(t,r)>1}},n=c.default.fromGrid(10,10,S.default),a=t(n),l=new _.default(n,e,u),s=new f.default({x:3.5,y:5.5},a),d=(0,o.createRaycaster)(a),y=(0,w.default)(),v=new m.default(e),g=new h.default({width:400,height:250});return setInterval(function(){return v.update(y.fps)},500),i(s),function(e){r.notify(e),g.setOrientation(s.position),g.render(d,l),y.update(e),v.render()}}function i(e){var t=function(e,t){return function(r){return t(e*r/1e3)}};r.onKeyLeft(t(100,function(t){return e.rotateLeft(t)})).onKeyRight(t(100,function(t){return e.rotateRight(t)})).onKeyUp(t(3,function(t){return e.moveForward(t)})).onKeyDown(t(3,function(t){return e.moveBackward(t)}))}var u=(0,a.createAssetStore)(),l=function(e){return function(){return g.default.load("../assets/"+e)}},s=[{key:"BRICK",loader:l("brick.jpg")},{key:"METAL",loader:l("metal.jpg")},{key:"STONE",loader:l("stone.jpg")},{key:"SKY",loader:l("sunset-sky.jpg")},{key:"TILE",loader:l("bw-tile.jpg")}];u.load(s).then(function(){var e=new y.default(t);e.loop(n()),e.start()})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var o=r(4),a=r(16),u=r(9),c=n(u),l=r(10),f=n(l),s=r(5),h=n(s),d=r(7),y=n(d),v=r(12),g=n(v),p=r(18),w=n(p),b=r(14),m=n(b),x=r(22),_=n(x),k=r(24),S=n(k)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,3,2,0,1,2,2,0,0,0,0,3,0,0,1,2,2,0,0,0,0,0,0,0,3,3,2,0,0,0,0,0,0,0,1,2,2,0,0,0,0,0,0,0,3,3,2,0,0,0,0,0,0,0,1,2,2,0,0,0,0,0,2,0,1,2,2,0,0,0,0,0,2,0,1,2,2,2,2,2,2,2,2,2,2,2]}]);