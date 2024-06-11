const num = document.querySelectorAll(".num");
const operator = document.querySelectorAll(".operator");
const previous = document.querySelector(".previous-display");
const current = document.querySelector(".current-display");
const equal = document.querySelector(".equal");
const ac = document.querySelector(".ac");
const percent = document.querySelector(".percent")
const pm=document.querySelector(".pm")

let altekranText = "";
let üstEkranText="";
let islem="";

num.forEach((number) => {
  number.onclick = () => {
    //altekranText=number.textContent
    //current.textContent=altekranText burdaki islem fonksiyonda yapilmasi icin bu sekilde kullanildi.

    ekranaHazirlik(number.textContent);
  };
});

//!EKRANA HAZIRLIK ISLEMLERI

const ekranaHazirlik = (num) => {
  

  // ? kullanıcı 0 girerse, sonrasında 0 ve . dışında bir sayı girerse, ekranda sadece girilen yeni sayı (0 iptal olsun) gözüksün.

  if (altekranText === "0" && num !=="0" && num !== ".") {
      altekranText=num
      updateEkran()
      return;
  }

   //? Kullanici ilk basta 0 girer ardindan tekrar 0 girerse, girilmesin, tek 0 döndürsün.

  if (altekranText == "0" && num =="0")  return

  //? Kullanici herhangibir yerde . girmisken, tekrar nokta girmeye kalkarsa giremesin.

  if (num ==="." && altekranText.includes(".")) return
    
  
  //? Kullanici 10 haneden sonra girmesin.

 if (altekranText.length>9) return

 //? kullanici 10 dan fazla girerse exponantial olarak gösterim yapsin.
    
  //const deger = (altekranText.length>9) ? altekranText.length.toExponential(5) : altekranText
  //altekranText=deger;

  //const deger=(altekranText.length>10) ? altekranText="error" : altekranText
  // altekranText=deger

  altekranText += num;
  updateEkran()

};

//! EKRANDA GÖSTERME ISLEMLERI
const updateEkran = ()=>{
  current.textContent=altekranText;

  if (islem) {
    previous.textContent= `${üstEkranText}  ${islem}`;
  }
  else{
    previous.textContent="";
  }
  
}


operator.forEach((op)=>{
  op.onclick=()=>{

    if (altekranText==="") return // return burda alt ekran bos ise bir sey yapma diyerek devam et demek ve cok önemli bir taktik. Ekranda gösterilecek metin boş olduğunda belirli işlemleri yapmanın gereksiz olduğunu düşünüyorsanız, bu kontrolü kullanarak işlemi durdurabilirsiniz.
      
    
    if (altekranText && üstEkranText) 
      hesapla()
  
    islem=op.textContent
    üstEkranText=altekranText
    altekranText="";
    updateEkran();
  }
})

equal.onclick=()=>{
  hesapla()
  updateEkran()
  altekranText="";
}

const hesapla=()=>{
  switch (islem) {
    case "+": 
    sonuc = Number(üstEkranText) + Number(altekranText);
      break;
    case "-": 
   sonuc =  üstEkranText - altekranText;
      break;
    case "x":
      sonuc = üstEkranText * altekranText;
      break;
    case "÷":
     sonuc =  üstEkranText / altekranText;
      break;
    default:
      break;
  }
  altekranText= sonuc;
  üstEkranText="";
  islem="";
}

ac.onclick =()=>{
  islem="";
  altekranText="";
  üstEkranText="";
  updateEkran();
}

percent.onclick=()=>{
  altekranText = altekranText / 100;
  updateEkran()
}

pm.onclick=()=>{
  altekranText=altekranText*-1
  updateEkran()
}