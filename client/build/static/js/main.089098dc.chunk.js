(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{19:function(t,e,n){t.exports=n(45)},24:function(t,e,n){},26:function(t,e,n){t.exports=n.p+"static/media/logo.5d5d9eef.svg"},27:function(t,e,n){},45:function(t,e,n){"use strict";n.r(e);var a=n(1),c=n.n(a),o=n(14),r=n.n(o),i=(n(24),n(2)),s=n.n(i),u=n(3),l=n(15),h=n(16),d=n(17),f=n(18),p=(n(26),n(27),n(4)),v=n.n(p),m=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).PORT||3e3,g="http://localhost:".concat(m),b=function(t){Object(f.a)(n,t);var e=Object(d.a)(n);function n(){var t;return Object(l.a)(this,n),(t=e.call(this)).getCubes=Object(u.a)(s.a.mark((function e(){var n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.get("".concat(g,"/get"));case 3:n=e.sent,a=n.data,t.setState({cubes:a}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),t.canvasClick=function(){var e=Object(u.a)(s.a.mark((function e(n){var a,c,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.state.currentCube,c=n.pageX,o=n.pageY,e.next=4,v.a.post("".concat(g,"/change?id=").concat(a),{fromX:0,fromY:0,toX:c,toY:o});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.drawLoop=function(){var e=t.state.cubes;t.ctx.beginPath(),t.ctx.fillStyle="black",t.ctx.rect(0,0,t.c.width,t.c.height),t.ctx.fill(),e.forEach((function(e){t.ctx.beginPath(),t.ctx.fillStyle="orange",t.ctx.rect(e.toX,e.toY,100,100),t.ctx.fill()})),requestAnimationFrame(t.drawLoop)},t.state={cubes:[],currentCube:1},t.c=null,t.ctx=null,t}return Object(h.a)(n,[{key:"componentDidMount",value:function(){this.getCubes(),this.c=document.getElementById("canvas"),this.ctx=this.c.getContext("2d"),requestAnimationFrame(this.drawLoop)}},{key:"render",value:function(){var t=this.state.cubes;return c.a.createElement("div",null,c.a.createElement("canvas",{onClick:this.canvasClick,width:1500,height:700,id:"canvas"}),t.map((function(t){return c.a.createElement("div",{key:t.id},t.name)})))}}]),n}(c.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.089098dc.chunk.js.map