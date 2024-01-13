function playableCharacter(url){
        let image = document.createElement('img')
        image.src = url
        image
        document.body.append(image)
        return image
}

