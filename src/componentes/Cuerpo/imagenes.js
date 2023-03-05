import React from 'react';
import logo1 from '../img/logo2.jpg';
import logo2 from '../img/logo2oro.jpg';
import logo3 from '../img/logo2plata.jpg';
import logo4 from '../img/logo2negro.jpg';

class ImageSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [logo1, logo2, logo3, logo4],
            currentIndex: 0,
            showFade: false // agregamos el estado para el fadeout
        };
        this.timer = null;
        this.changeImage = this.changeImage.bind(this);
        this.updateActiveButton = this.updateActiveButton.bind(this);
        this.restartTimer = this.restartTimer.bind(this);
    }
    
    componentDidMount() {
        this.restartTimer();
    }
    
    changeImage(index) {
        this.setState({ currentIndex: index, showFade: true });
        this.updateActiveButton(index); // actualizar el botón activo
        setTimeout(() => {
            this.setState({ showFade: false });
        }, 1000); // desactivar el fadeout después de 1 segundo
    }
    
    updateActiveButton(index) {
        const activeButton = document.querySelector(".cambioColor a.active");
        if (activeButton) {
            activeButton.classList.remove("active");
        }
        const newActiveButton = document.querySelector(`.cambioColor a[data-index="${index}"]`);
        newActiveButton.classList.add("active");
    }
    
    restartTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            const nextIndex = (this.state.currentIndex + 1) % this.state.images.length;
            this.setState({ currentIndex: nextIndex, showFade: true }); // activar el fadeout
            this.updateActiveButton(nextIndex); // actualizar el botón activo
            setTimeout(() => {
                this.setState({ showFade: false });
            }, 1000); // desactivar el fadeout después de 1 segundo
        }, 5000);
    }
    
    render() {
        const currentImage = this.state.images[this.state.currentIndex];
        return (
            <div id="imageContainer">
                <img id="currentImage" src={currentImage} className={this.state.showFade ? 'fade' : ''} alt="celulares" />
    
                <div className="cambioColor">
                    <a href=" " data-index="0" className={this.state.currentIndex === 0 ? 'active' : ''} onClick={(e) => { e.preventDefault(); this.changeImage(0) }}>Violeta</a>
                    <a href=" " data-index="1" className={this.state.currentIndex === 1 ? 'active' : ''} onClick={(e) => { e.preventDefault(); this.changeImage(1) }}>Dorado</a>
                    <a href=" " data-index="2" className={this.state.currentIndex === 2 ? 'active' : ''} onClick={(e) => { e.preventDefault(); this.changeImage(2) }}>Plata</a>
                    <a href=" " data-index="3" className={this.state.currentIndex === 3 ? 'active' : ''} onClick={(e) => { e.preventDefault(); this.changeImage(3) }}>Negro</a>
                </div>
            </div>
        );
        }
    }
    

export default ImageSlider;
