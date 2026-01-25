export default function AuraBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <div 
        data-us-project="BqS5vTHVEpn6NiF0g8iJ" 
        style={{ width: '100%', height: '100%' }}
      />
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            !function(){
              if(!window.UnicornStudio){
                window.UnicornStudio={isInitialized:false};
                var i=document.createElement("script");
                i.src="https://cdn.jsdelivr.net/gh/AroMorin/unicorn-studio@v1.4.29/dist/unicornStudio.umd.js";
                i.onload=function(){
                  if(!window.UnicornStudio.isInitialized){
                    UnicornStudio.init();
                    window.UnicornStudio.isInitialized=true;
                  }
                };
                (document.head||document.body).appendChild(i);
              } else if(!window.UnicornStudio.isInitialized){
                UnicornStudio.init();
                window.UnicornStudio.isInitialized=true;
              }
            }();
          `
        }} 
      />
    </div>
  );
}
