(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{102:function(t,e,n){"use strict";n.r(e);var c=n(1),a=n.n(c),o=n(40),r=n.n(o),i=(n(51),n(4)),s=n.n(i),u=n(14),l=n(41),d=n(42),h=n(44),f=n(45),m=(n(53),n(15)),v=n.n(m),x=n(43),b=n.n(x),p=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).PORT||3e3,g="http://".concat(window.location.hostname,":").concat(p),w=b()("http://".concat(window.location.hostname,":9000")),C=function(t){Object(f.a)(n,t);var e=Object(h.a)(n);function n(){var t;return Object(l.a)(this,n),(t=e.call(this)).getCubes=Object(u.a)(s.a.mark((function e(){var n,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.get("".concat(g,"/get"));case 3:n=e.sent,c=n.data,t.setState({cubes:c}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),t.getCoords=function(e){var n=e.fromTime,c=e.toTime,a=e.fromX,o=e.toX,r=e.fromY,i=e.toY,s=c-n,u=t.time-n;if(u<s){var l=s/u;return{x:a+(o-a)/l,y:r+(i-r)/l}}return{x:o,y:i}},t.canvasClick=function(){var e=Object(u.a)(s.a.mark((function e(n){var c,a,o,r,i,u,l,d,h;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.state,a=c.currentCube,o=c.cubes,r=n.pageX,i=n.pageY,u=o.find((function(t){return t.id===a})),l=t.getCoords(u),d=l.x,h=l.y,e.next=6,v.a.post("".concat(g,"/change?id=").concat(a),{fromX:d,fromY:h,toX:r,toY:i});case 6:w.emit("click");case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.drawLoop=function(){var e=t.state,n=e.cubes,c=e.currentCube;t.time=Date.now(),t.ctx.beginPath(),t.ctx.fillStyle="black",t.ctx.rect(0,0,t.c.width,t.c.height),t.ctx.fill(),n.forEach((function(e){var n=t.getCoords(e),a=n.x,o=n.y;t.ctx.beginPath(),t.ctx.fillStyle=t.colors[e.id],t.ctx.rect(a,o,100,100),t.ctx.fill(),e.id==c&&(t.ctx.beginPath(),t.ctx.lineWidth=7,t.ctx.strokeStyle="red",t.ctx.rect(a,o,100,100),t.ctx.stroke()),t.ctx.beginPath(),t.ctx.fillStyle="white",t.ctx.font="30px Arial",t.ctx.fillText(e.name,a,o+45),t.ctx.fill()})),requestAnimationFrame(t.drawLoop)},t.time=Date.now(),t.state={cubes:[],currentCube:1},t.c=null,t.ctx=null,t.colors=["red","orange","green"],t}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.getCubes(),this.c=document.getElementById("canvas"),this.ctx=this.c.getContext("2d"),w.on("click",(function(e){t.getCubes()})),requestAnimationFrame(this.drawLoop)}},{key:"render",value:function(){var t=this,e=this.state,n=e.cubes,c=e.currentCube;return a.a.createElement("div",null,a.a.createElement("canvas",{onClick:this.canvasClick,width:1500,height:700,id:"canvas"}),a.a.createElement("br",null),n.map((function(e){var n=e.id===c?"select":"";return a.a.createElement("div",{style:{backgroundColor:t.colors[e.id]},onClick:function(){t.setState({currentCube:e.id})},className:"type ".concat(n),key:e.id},e.name)})))}}]),n}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},46:function(t,e,n){t.exports=n(102)},51:function(t,e,n){},53:function(t,e,n){},99:function(t,e){}},[[46,1,2]]]);
//# sourceMappingURL=main.17a8e4e0.chunk.js.map