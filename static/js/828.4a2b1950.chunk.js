"use strict";(self.webpackChunkpma=self.webpackChunkpma||[]).push([[828],{4828:function(a,e,n){n.r(e),n.d(e,{default:function(){return E}});var t=n(1413),r=n(9439),i=n(5987),o=n(1694),s=n.n(o),c=n(2791),d=(n(2391),n(8580)),l=n(1337),u=n(162),m=n(9007),v=n(4787),f=n(4944),h=n(184),p=["bsPrefix","active","disabled","eventKey","className","variant","action","as"],b=c.forwardRef((function(a,e){var n=a.bsPrefix,o=a.active,c=a.disabled,d=a.eventKey,l=a.className,b=a.variant,x=a.action,Z=a.as,N=(0,i.Z)(a,p);n=(0,u.vE)(n,"list-group-item");var k=(0,v.v)((0,t.Z)({key:(0,f.h)(d,N.href),active:o},N)),g=(0,r.Z)(k,2),y=g[0],j=g[1],w=(0,m.Z)((function(a){if(c)return a.preventDefault(),void a.stopPropagation();y.onClick(a)}));c&&void 0===N.tabIndex&&(N.tabIndex=-1,N["aria-disabled"]=!0);var I=Z||(x?N.href?"a":"button":"div");return(0,h.jsx)(I,(0,t.Z)((0,t.Z)((0,t.Z)({ref:e},N),y),{},{onClick:w,className:s()(l,n,j.isActive&&"active",c&&"disabled",b&&"".concat(n,"-").concat(b),x&&"".concat(n,"-action"))}))}));b.displayName="ListGroupItem";var x=b,Z=["className","bsPrefix","variant","horizontal","numbered","as"],N=c.forwardRef((function(a,e){var n,r=(0,d.Ch)(a,{activeKey:"onSelect"}),o=r.className,c=r.bsPrefix,m=r.variant,v=r.horizontal,f=r.numbered,p=r.as,b=void 0===p?"div":p,x=(0,i.Z)(r,Z),N=(0,u.vE)(c,"list-group");return v&&(n=!0===v?"horizontal":"horizontal-".concat(v)),(0,h.jsx)(l.Z,(0,t.Z)((0,t.Z)({ref:e},x),{},{as:b,className:s()(o,N,m&&"".concat(N,"-").concat(m),n&&"".concat(N,"-").concat(n),f&&"".concat(N,"-numbered"))}))}));N.displayName="ListGroup";var k=Object.assign(N,{Item:x}),g=n(6144),y=n(3360),j=n(9508),w=n(9434),I=[{name:"editTask",icon:"bi-pencil",color:"text-primary"},{name:"remove",icon:"bi-trash",color:"text-danger"}],C=function(a){var e=(0,w.I0)(),n=(0,w.v9)((function(a){return a})),t=n.users,r=n.setting.theme,i=function(a,n,t){a.stopPropagation(),e((0,j.h7)({name:n,data:t}))};return(0,h.jsxs)(k.Item,{variant:r,className:"w-100",onClick:function(e){return i(e,"infoTask",a)},children:[(0,h.jsxs)("div",{className:"row align-middle",children:[(0,h.jsx)("h6",{className:"col",children:a.title}),(0,h.jsx)(g.Z,{className:"col float-right",children:I.map((function(e){var n=e.name,t=e.icon;return(0,h.jsx)(y.Z,{variant:"secondary",size:"sm",onClick:function(e){return i(e,n,a)},children:(0,h.jsx)("i",{className:t})},n)}))})]}),(0,h.jsx)("div",{className:"row p-2",children:a.description}),(0,h.jsx)("div",{className:"row p-2",children:function(a){var e=t.all.filter((function(e){return e.id===a}));return 0!==e.length?e[0].login:"unknown"}(a.userId)})]})},P=n(1532),z=n(3117),E=function(a){var e=a.data,n=(0,c.useState)(e.tasks.sort((function(a,e){return a.order-e.order}))),i=(0,r.Z)(n,2),o=i[0],s=i[1];return(0,h.jsx)(P.ReactSortable,{list:o,setList:s,onEnd:function(a){var e=a.from,n=a.to,r=a.oldIndex,i=a.newIndex,s=o[r],c=s.boardId,d=s.id;(0,z.yW)(c,e.id,d).then((function(a){var e=a.data,r=(0,t.Z)((0,t.Z)({},e),{},{columnId:n.id,order:i+1});(0,z.eT)(e,r)}))},animation:200,delayOnTouchOnly:!0,delay:2,group:"shared",className:"list-group shadow-sm",id:e.id,children:o.map((function(a){return(0,c.createElement)(C,(0,t.Z)((0,t.Z)({},a),{},{key:a.id}))}))})}}}]);
//# sourceMappingURL=828.4a2b1950.chunk.js.map