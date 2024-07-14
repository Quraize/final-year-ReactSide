const NavbarDivVariant = {
  initial: {
    y: '-120vw',
  },
  final:{
    y: 0,
    transition: {
      duration: 0.4,
      type: 'tween',
      stiffness: 40
    }
  }
}

const NavbarVariantDesktop = {
  initial: {
    y: '-120vw',
  },
  final:{
    y: 0,
    transition: {
      duration: 0.6,
      type: 'spring',
      stiffness: 35
    }
  },
  hoverInitial:{
    scale: 0
  },
  hoverFinale:{
    scale:1.1,
    transition:{
      delay: 0,
      duration: 0.1,
    }
  }
}

const variantForHoverButton = {
    initial:{
        scale: 1
    },
    final:{
      scale:1
    },
    hoverInitial:{
      scale:0
    },
    hoverFinal:{
      scale: 1.03,
      boxShadow: "0px 0px 8px rgb(0, 0, 0)",
      transition:{
        delay: 0,
        duration: 0.1,
      }
    }
}

const variantForScroll ={
  hidden: {
    x: '-30vw'
  },
  final:{
    x:0,
    transition:{
      delay: 0,
      duration: 1.5,
      type: 'spring',
      stiffness: 40
    }
  }
}


const NavbarVariantMobile = {
  initial: {
    x: '+120vw',
  },
  final:{
    x: 0,
    transition:{
      delay: 0.6,
      duration: 1.5,
      type: 'spring',
      stiffness: 40
    }
  }
}

const TextComVariant = {
  initial:{
    x:"-120vw"
  },
  final:{
    x: 0,
    transition:{
      delay: 0.6,
      duration: 1.5,
      type: 'spring',
      stiffness: 40
    }
  }
}

export {
  NavbarVariantDesktop,
  NavbarDivVariant,
  variantForScroll,
  variantForHoverButton,
  NavbarVariantMobile,
  TextComVariant
}