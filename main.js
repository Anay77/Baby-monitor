img="";
status="";
objects=[];
function preload(){   
    loadimage="baby.jpg";
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(40,40);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function draw(){
    image(video,0,0,380,380);
    if(status !=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
       for(i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML="status: object detected";
           document.getElementById("baby_found").innerHTML="";
           fill(r,g,b);
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+" "+percent+"%",objects[i].x, objects[i].y);
           noFill();
           stroke(r,g,b);
           rect(objects[i].x, objects[i].y, objects[i].width ,objects[i].height);
       }
       if(video != babyimg){
           document.getElementById("baby_found").innerHTML="baby not found";
       }
    }
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}