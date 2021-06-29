Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    dz.on('addedfile',function(){
        if(dz.files[1]!=null){
            dz.removeFile(dz.files[0])
        }
    });
    dz.on('complete',function(file){
        let imageData = file.dataURL;

        var url = 'http://127.0.0.1:5000/classify_cat';

        $.post(url, {
            image_data: imageData
        },function(data,status){
            console.log(data)
        });
    });
    $('#submitBtn').on('click',function(e){
        dz.processQueue()
    });
}
