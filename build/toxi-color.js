// toxi-color.js r34 - http://github.com/hapticdata/toxiclibsjs
toxi.color=toxi.color===undefined?{}:toxi.color;toxi.color.TColor=function(a){this.rgb=Array(3);this.hsv=Array(3);this.cmyk=Array(4);this._alpha=1;if(a!==undefined){this.cmyk=a.toCMYKAArray().splice(0,4);this.hsv=a.toHSVAArray().splice(0,3);this.rgb=a.toRGBAArray().splice(0,3);this._alpha=a._alpha}};
toxi.color.TColor.prototype={add:function(a){return this.copy().addSelf(a)},addSelf:function(a){this.rgb[0]=toxi.MathUtils.min(this.rgb[0]+a.rgb[0],1);this.rgb[1]=toxi.MathUtils.min(this.rgb[1]+a.rgb[1],1);this.rgb[2]=toxi.MathUtils.min(this.rgb[2]+a.rgb[2],1);return this.setRGB(rgb)},adjustConstrast:function(a){return this.hsv[2]<0.5?this.darken(a):this.lighten(a)},adjustHSV:function(a,b,d){return this.setHSV([this.hsv[0]+a,this.hsv[1]+b,this.hsv[2]+d])},adjustRGB:function(a,b,d){return this.setRGB([this.rgb[0]+
a,this.rgb[1]+b,this.rgb[2]+d])},alpha:function(){return this._alpha},analog:function(a,b){this.rotateRYB(toxi.MathUtils.degrees(a)*toxi.MathUtils.normalizedRandom());this.hsv[1]+=b*toxi.MathUtils.normalizedRandom();this.hsv[2]+=b*toxi.MathUtils.normalizedRandom();return this.setHSV(this.hsv)},black:function(){return this.cmyk[3]},blend:function(a,b){if(b===undefined)b=0.5;var d=a.toRGBAArray();this.rgb[0]+=(d[0]-this.rgb[0])*b;this.rgb[1]+=(d[1]-this.rgb[1])*b;this.rgb[2]+=(d[2]-this.rgb[2])*b;this._alpha+=
(a.alpha()-this._alpha)*b;return this.setRGB(this.rgb)},blue:function(){return this.rgb[2]},brightness:function(){return this.hsv[2]},complement:function(){return this.rotateRYB(180)},copy:function(){return new toxi.color.TColor(this)},cyan:function(){return this.cmyk[0]},darken:function(a){this.hsv[2]=toxi.MathUtils.clip(this.hsv[2]-a,0,1);return this.setHSV(this.hsv)},desaturate:function(a){this.hsv[1]=toxi.MathUtils.clip(this.hsv[1]-a,0,1);return this.setHSV(this.hsv)},differenceTo:function(a){return toxi.color.TColor.newRGB(Math.abs(this.rgb[0]-
a.rgb[0]),Math.abs(this.rgb[1]-a.rgb[1]),Math.abs(this.rgb[2]-a.rgb[2]))},distanceToCMYK:function(a){var b=a.toCMYKAArray();a=this.cmyk[0]-b[0];var d=this.cmyk[1]-b[1],c=this.cmyk[2]-b[2];b=this.cmyk[3]-b[3];return Math.sqrt(a*a+d*d+c*c+b*b)},distanceToHSV:function(a){var b=this.hsv[0]*toxi.MathUtils.TWO_PI,d=a.hue()*toxi.MathUtils.TWO_PI;b=new toxi.Vec3D(Math.cos(b)*this.hsv[1],Math.sin(b)*this.hsv[1],this.hsv[2]);a=new toxi.Vec3D(Math.cos(d)*a.saturation(),Math.sin(d)*a.saturation(),a.brightness());
return b.distanceTo(a)},distanceToRGB:function(a){var b=a.toRGBAArray();a=this.rgb[0]-b[0];var d=this.rgb[1]-b[1];b=this.rgb[2]-b[2];return Math.sqrt(a*a+d*d+b*b)},equals:function(a){if(a!==undefined&&a instanceof toxi.color.TColor){var b=a.rgb[0]-rgb[0],d=a.rgb[1]-rgb[1],c=a.rgb[2]-rgb[2];a=a.alpha()-this._alpha;return Math.sqrt(b*b+d*d+c*c+a*a)<toxi.color.TColor.EPS}return false},getAnalog:function(a,b){return(new toxi.color.TColor(this)).analog(a,b)},getBlended:function(a,b){return(new toxi.color.TColor(this)).blend(a,
b)},getComplement:function(){return(new toxi.color.TColor(this)).complement()},getComponentValue:function(a){return a.getComponentValueFor(this)},getDarkened:function(a){return(new toxi.color.TColor(this)).darken(a)},getDesaturated:function(a){return(new toxi.color.TColor(this)).desaturate(a)},getDifferenceTo:function(a){return this.copy().differenceTo(a)},getInverted:function(){return(new toxi.color.TColor(this)).invert()},getLightened:function(a){return(new toxi.color.TColor(this)).lighten(a)},
getRotatedRYB:function(a){return(new toxi.color.TColor(this)).rotateRYB(a)},getSaturated:function(a){return(new toxi.color.TColor(this)).saturate(a)},green:function(){return this.rgb[1]},hue:function(){return this.hsv[0]},invert:function(){this.rgb[0]=1-this.rgb[0];this.rgb[1]=1-this.rgb[1];this.rgb[2]=1-this.rgb[2];return this.setRGB(this.rgb)},isBlack:function(){return this.rgb[0]<=toxi.color.TColor.BLACK_POINT&&this.rgb[0]==this.rgb[1]&&this.rgb[0]==this.rgb[2]},isGrey:function(){return this.hsv[1]<
toxi.color.TColor.GREY_THRESHOLD},isWhite:function(){return this.rgb[0]>=toxi.color.TColor.WHITE_POINT&&this.rgb[0]==this.rgb[1]&&this.rgb[0]==this.rgb[2]},lighten:function(a){this.hsv[2]=toxi.MathUtils.clip(this.hsv[2]+a,0,1);return this.setHSV(this.hsv)},luminance:function(){return this.rgb[0]*0.299+this.rgb[1]*0.587+this.rgb[2]*0.114},magenta:function(){return this.cmyk[1]},red:function(){return this.rgb[0]},rotateRYB:function(a){parseInt(toxi.MathUtils.degrees(a));var b=this.hsv[0]*360;a%=360;
for(var d=0,c=0;c<toxi.color.TColor.RYB_WHEEL.length-1;c++){var e=toxi.color.TColor.RYB_WHEEL[c],f=toxi.color.TColor.RYB_WHEEL[c+1];if(f.y<e.y)f.y+=360;if(e.y<=b&&b<=f.y){d=e.x+(f.x-e.x)*(b-e.y)/(f.y-e.y);break}}d=(d+a)%360;for(c=0;c<toxi.color.TColor.RYB_WHEEL.length-1;c++){e=toxi.color.TColor.RYB_WHEEL[c];f=toxi.color.TColor.RYB_WHEEL[c+1];if(f.y<e.y)f.y+=360;if(e.x<=d&&d<=f.x){b=e.y+(f.y-e.y)*(d-e.x)/(f.x-e.x);break}}this.hsv[0]=b%360/360;return this.setHSV(hsv)},saturate:function(a){this.hsv[1]=
toxi.MathUtils.clip(this.hsv[1]+a,0,1);return this.setHSV(this.hsv)},saturation:function(){return this.hsv[1]},setAlpha:function(a){this._alpha=a;return this},setARGB:function(a){this.setRGB((a>>16&255)*toxi.TColor.INV8BIT,(a>>8&255)*toxi.TColor.INV8BIT,(a&255)*toxi.TColor.INV8BIT);this._alpha=(a>>>24)*toxi.TColor.INV8BIT;return this},setBlack:function(a){this.cmyk[3]=a;return this.setCMYK(cmyk)},setBlue:function(a){this.rgb[2]=a;return this.setRGB(this.rgb)},setBrightness:function(a){this.hsv[2]=
toxi.MathUtils.clip(a,0,1);return this.setHSV(this.hsv)},setCMYK:function(a,b,d,c){if(a instanceof Array){b=a[1];d=a[2];c=a[3];a=a[0]}this.cmyk[0]=a;this.cmyk[1]=b;this.cmyk[2]=d;this.cmyk[3]=c;this.rgb=toxi.color.TColor.cmykToRGB(this.cmyk[0],this.cmyk[1],this.cmyk[2],this.cmyk[3]);this.hsv=toxi.color.TColor.rgbToHSV(this.rgb[0],this.rgb[1],this.rgb[2]);return this},setCyan:function(a){this.cmyk[0]=a;return this.setCMYK(this.cmyk)},setGreen:function(a){this.rgb[1]=a;return this.setRGB(this.rgb)},
setHSV:function(a,b,d){if(a instanceof Array){b=a[1];d=a[2];a=a[0]}a=[a,b,d];this.hsv[0]=a[0]%1;this.hsv[0]<0&&this.hsv[0]++;this.hsv[1]=toxi.MathUtils.clip(a[1],0,1);this.hsv[2]=toxi.MathUtils.clip(a[2],0,1);this.rgb=toxi.color.TColor.hsvToRGB(this.hsv[0],this.hsv[1],this.hsv[2]);this.cmyk=toxi.color.TColor.rgbToCMYK(this.rgb[0],this.rgb[1],this.rgb[2]);return this},setHue:function(a){a%=1;a<0&&a++;this.hsv[0]=a;this.setHSV(this.hsv)},setMagenta:function(a){this.cmyk[1]=a;return this.setCMYK(this.cmyk)},
setRed:function(a){this.rgb[0]=a;return this.setRGB(this.rgb)},setRGB:function(a,b,d){if(a instanceof Array){b=a[1];d=a[2];a=a[0]}this.rgb[0]=toxi.MathUtils.clip(a,0,1);this.rgb[1]=toxi.MathUtils.clip(b,0,1);this.rgb[2]=toxi.MathUtils.clip(d,0,1);this.cmyk=toxi.color.TColor.rgbToCMYK(this.rgb[0],this.rgb[1],this.rgb[2]);this.hsv=toxi.color.TColor.rgbToHSV(this.rgb[0],this.rgb[1],this.rgb[2]);return this},setSaturation:function(a){this.hsv[1]=toxi.MathUtils.clip(a,0,1);return this.setHSV(this.hsv)},
setYellow:function(a){this.cmyk[2]=a;return this.setCMYK(this.cmyk)},sub:function(a){return this.copy().subSelf(a)},subSelf:function(a){this.rgb[0]=toxi.MathUtils.max(this.rgb[0]-a.rgb[0],0);this.rgb[1]=toxi.MathUtils.max(this.rgb[1]-a.rgb[1],0);this.rgb[2]=toxi.MathUtils.max(this.rgb[2]-a.rgb[2],0);return this.setRGB(this.rgb)},toARGB:function(){return parseInt(this.rgb[0]*255)<<16|parseInt(this.rgb[1]*255)<<8|parseInt(this.rgb[2]*255)|parseInt(this._alpha*255)<<24},toCMYKAArray:function(a){if(a===
undefined)a=[];a[0]=this.cmyk[0];a[1]=this.cmyk[1];a[2]=this.cmyk[2];a[3]=this._alpha;return a},toHex:function(){for(var a="",b,d=0;d<3;d++){b=parseInt(this.rgb[d]*255).toString(16);a+=b.length==1?"0"+b:b}return a},toHSVAArray:function(a){if(a===undefined)a=[];a[0]=this.hsv[0];a[1]=this.hsv[1];a[2]=this.hsv[2];a[3]=this._alpha;return a},toRGBAArray:function(a,b){if(a===undefined){a=[];b=0}a[b++]=this.rgb[0];a[b++]=this.rgb[1];a[b++]=this.rgb[2];a[b]=this._alpha;return a},toString:function(){return"toxi.color.TColor: rgb: "+
this.rgb[0]+", "+this.rgb[1]+", "+this.rgb[2]+" hsv: "+this.hsv[0]+","+this.hsv[1]+","+this.hsv[2]+" cmyk: "+this.cmyk[0]+", "+this.cmyk[1]+","+this.cmyk[2]+","+this.cmyk[3]+" alpha: "+this._alpha},yellow:function(){return this.cmyk[2]}};toxi.color.TColor.INV60DEGREES=60/360;toxi.color.TColor.INV8BIT=1/255;toxi.color.TColor.EPS=0.0010;toxi.color.TColor.BLACK_POINT=0.08;toxi.color.TColor.WHITE_POINT=1;toxi.color.TColor.GREY_THRESHOLD=0.01;
toxi.color.TColor.cmykToRGB=function(a,b,d,c,e){if(e===undefined)e=[0,0,0];e[0]=1-Math.min(1,a+c);e[1]=1-Math.min(1,b+c);e[2]=1-Math.min(1,d+c);return e};toxi.color.TColor.hexToRGB=function(a,b){if(b===undefined)b=[];a=a.charAt(0)=="#"?a.substring(1,7):a;b[0]=parseInt(a.substring(0,2),16)*toxi.color.TColor.INV8BIT;b[1]=parseInt(a.substring(2,4),16)*toxi.color.TColor.INV8BIT;b[2]=parseInt(a.substring(4,6),16)*toxi.color.TColor.INV8BIT;return b};
toxi.color.TColor.hsvToRGB=function(a,b,d,c){if(c===undefined)c=[];if(b==0)c[0]=c[1]=c[2]=d;else{a/=toxi.color.TColor.INV60DEGREES;var e=parseInt(a),f=a-e;a=d*(1-b);var g=d*(1-b*f);b=d*(1-b*(1-f));if(e==0){c[0]=d;c[1]=b;c[2]=a}else if(e==1){c[0]=g;c[1]=d;c[2]=a}else if(e==2){c[0]=a;c[1]=d;c[2]=b}else if(e==3){c[0]=a;c[1]=g;c[2]=d}else if(e==4){c[0]=b;c[1]=a;c[2]=d}else{c[0]=d;c[1]=a;c[2]=g}}return c};
toxi.color.TColor.labToRGB=function(a,b,d,c){if(c===undefined)c=[];a=(a+16)/116;b=b/500+a;d=a-d/200;c[0]=b;c[1]=a;c[2]=d;for(d=0;d<3;d++){a=Math.pow(c[d],3);c[d]=a>0.008856?a:(c[d]-16/116)/7.787}b=c[0]*0.95047;a=c[1];d=c[2]*1.08883;c[0]=b*3.2406+a*-1.5372+d*-0.4986;c[1]=b*-0.9689+a*1.8758+d*0.0415;c[2]=b*0.0557+a*-0.204+d*1.057;a=1/2.4;for(d=0;d<3;d++)c[d]=c[d]>0.0031308?1.055*Math.pow(c[d],a)-0.055:12.92*c[d];return c};
toxi.color.TColor.newARGB=function(a){return toxi.color.TColor.newRGBA((a>>16&255)*toxi.color.TColor.INV8BIT,(a>>8&255)*toxi.color.TColor.INV8BIT,(a&255)*toxi.color.TColor.INV8BIT,(a>>>24)*toxi.color.TColor.INV8BIT)};toxi.color.TColor.newCMYK=function(a,b,d,c){return toxi.color.TColor.newCMYKA(a,b,d,c,1)};toxi.color.TColor.newCMYKA=function(a,b,d,c,e){var f=new TColor;f.setCMYK([a,b,d,c]);f.setAlpha(toxi.MathUtils.clip(e,0,1));return f};
toxi.color.TColor.newGray=function(a){return toxi.color.TColor.newGrayAlpha(a,1)};toxi.color.TColor.newGrayAlpha=function(a,b){var d=new toxi.color.TColor;d.setRGB([a,a,a]);d.setAlpha(b);return d};toxi.color.TColor.newHex=function(a){var b=new toxi.color.TColor;b.setRGB(toxi.color.TColor.hexToRGB(a));b.setAlpha(1);return b};toxi.color.TColor.newHSV=function(a,b,d){return toxi.color.TColor.newHSVA(a,b,d,1)};
toxi.color.TColor.newHSVA=function(a,b,d,c){var e=new toxi.color.TColor;e.setHSV(a,b,d);e.setAlpha(toxi.MathUtils.clip(c,0,1));return e};toxi.color.TColor.newRandom=function(){return toxi.color.TColor.newRGBA(Math.random(),Math.random(),Math.random(),1)};toxi.color.TColor.newRGB=function(a,b,d){return toxi.color.TColor.newRGBA(a,b,d,1)};toxi.color.TColor.newRGBA=function(a,b,d,c){var e=new toxi.color.TColor;e.setRGB([a,b,d]);e.setAlpha(toxi.MathUtils.clip(c,0,1));return e};
toxi.color.TColor.rgbToCMYK=function(a,b,d,c){if(c===undefined)c=[];c[0]=1-a;c[1]=1-b;c[2]=1-d;c[3]=toxi.MathUtils.min(c[0],c[1],c[2]);c[0]=toxi.MathUtils.clip(c[0]-c[3],0,1);c[1]=toxi.MathUtils.clip(c[1]-c[3],0,1);c[2]=toxi.MathUtils.clip(c[2]-c[3],0,1);c[3]=toxi.MathUtils.clip(c[3],0,1);return c};toxi.color.TColor.rgbToHex=function(a,b,d){return(toxi.MathUtils.clip(a,0,1)*255).toString(16)+(toxi.MathUtils.clip(b,0,1)*255).toString(16)+(toxi.MathUtils.clip(d,0,1)*255).toString(16)};
toxi.color.TColor.rgbToHSV=function(a,b,d,c){if(c===undefined)c=[];var e=0,f=0,g=toxi.MathUtils.max(a,b,d),h=g-toxi.MathUtils.min(a,b,d);if(g!=0)f=h/g;if(f!=0)e=a==g?(b-d)/h:b==g?2+(d-a)/h:4+(a-b)/h;e*=toxi.color.TColor.INV60DEGREES;if(e<0)e+=1;c[0]=e;c[1]=f;c[2]=g;return c};toxi.color.TColor.RED=toxi.color.TColor.newRGB(1,0,0);
toxi.color.TColor.RYB_WHEEL=[new toxi.Vec2D(0,0),new toxi.Vec2D(15,8),new toxi.Vec2D(30,17),new toxi.Vec2D(45,26),new toxi.Vec2D(60,34),new toxi.Vec2D(75,41),new toxi.Vec2D(90,48),new toxi.Vec2D(105,54),new toxi.Vec2D(120,60),new toxi.Vec2D(135,81),new toxi.Vec2D(150,103),new toxi.Vec2D(165,123),new toxi.Vec2D(180,138),new toxi.Vec2D(195,155),new toxi.Vec2D(210,171),new toxi.Vec2D(225,187),new toxi.Vec2D(240,204),new toxi.Vec2D(255,219),new toxi.Vec2D(270,234),new toxi.Vec2D(285,251),new toxi.Vec2D(300,
267),new toxi.Vec2D(315,282),new toxi.Vec2D(330,298),new toxi.Vec2D(345,329),new toxi.Vec2D(360,0)];toxi.color.TColor.GREEN=toxi.color.TColor.newRGB(0,1,0);toxi.color.TColor.BLUE=toxi.color.TColor.newRGB(0,0,1);toxi.color.TColor.CYAN=toxi.color.TColor.newRGB(0,1,1);toxi.color.TColor.MAGENTA=toxi.color.TColor.newRGB(1,0,1);toxi.color.TColor.YELLOW=toxi.color.TColor.newRGB(1,1,0);toxi.color.TColor.BLACK=toxi.color.TColor.newRGB(0,0,0);toxi.color.TColor.WHITE=toxi.color.TColor.newRGB(1,1,1);
