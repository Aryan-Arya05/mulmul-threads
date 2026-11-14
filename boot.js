// Runs before the page paints: theme, launch screen timer, and a guard against being embedded in another site.
if (window.top !== window.self) { document.documentElement.style.display = 'none'; }
(function(){var t="auto";try{t=localStorage.getItem("mt-theme")||"auto"}catch(e){}document.documentElement.dataset.theme=t==="auto"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t})();
window.addEventListener('DOMContentLoaded', function(){ setTimeout(function(){var e=document.getElementById("splash");if(!e)return;e.classList.add("hide");setTimeout(function(){e.remove()},700)},1600) });
