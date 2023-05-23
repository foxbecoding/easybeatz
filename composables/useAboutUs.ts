export const useAboutUs = (data?: any) => {
    interface AboutData {
        name: string
        title: string
        text: string
        imageSrc: string
        textClass: string
        imageClass: string
    }

    const aboutData = ref<AboutData[]>([
        {
            name: 'artist',
            title: 'Release Your Inner Artist',
            text: `
                    Music is the universal force that moves the world.  
                    Connect with your fans and take them on an endless journey.  
                    Challenge your creativity like never before and Unlock your true Potential! 
                  `,
            imageSrc: '/media/content/artist.png',
            textClass: 'mr-4 my-4',
            imageClass: 'ml-4 my-4'
        },
        {
            name: 'video',
            title: 'Unleash Your Creativity',
            text: `
                    Having the right instrumental will take your brand to the next level. 
                    This can be particulary important when differentiating yourself from other creators.
                    Make your brand unique by elevating your sound.
                  `,
            imageSrc: '/media/content/vlogger.png',
            textClass: 'ml-4 my-4',
            imageClass: 'mr-4 my-4'
        },
        {
            name: 'podcast',
            title: 'Engage Your Audience',
            text: `
                    A well-chosen beat can instantly capture the listener's attention and draw them in.
                    Establish your brand identity by having high-quality theme music  
                    while creating a sense of familiarity for your listeners.
                  `,
            imageSrc: '/media/content/podcasters.png',
            textClass: 'mr-4 my-4',
            imageClass: 'ml-4 my-4'
        }
    ])
    
    return { 
        aboutData
    }
}