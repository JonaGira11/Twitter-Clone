import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import {
    PhotographIcon,
    SearchCircleIcon,
    EmojiHappyIcon,
    CalendarIcon,
    LocationMarkerIcon,
} from '@heroicons/react/outline'
import {useSession} from 'next-auth/react'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({setTweets}: Props) {

    const [image, setImage] =useState<string>('')
const [input, setInput] = useState<string>('') 
const { data: session } = useSession()
const imageInputRef = useRef<HTMLInputElement>(null)
const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

const    addImageToTweet = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
e.preventDefault();
if (!imageInputRef.current?.value) return;
setImage(imageInputRef.current.value)
imageInputRef.current.value = '';
setImageUrlBoxIsOpen(false);


}

const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unkown User',
      profileImg: session?.user?.image || 'https:links.papareact/com/gll',
      image: image,  
    }
    console.log(tweetInfo, 'in the twet info')

    const result = await fetch(`/api/addTweet`, {
        body: JSON.stringify(tweetInfo),
        method: 'POST',
    })

    console.log(result, 'insicde the result log')

    const json = await result.json();
    // console.log(json, 'insdie json await')

    const newTweets = await fetchTweets();
    // console.log(newTweets, 'in new tweets')
    setTweets(newTweets)

    toast('Tweet Posted', {
        icon: '🚀',
    })
    return json
}

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postTweet();
    setInput('');
    setImage('');
    setImageUrlBoxIsOpen(false);

}


  return (
    <div className='flex space-x-2 p-5'>
        <img className="mt-4 h-14 w-14 object-cover rounded-full" src={ session?.user?.image ||'https://links.papareact.com/gll'} 
        alt="profile"/>
         <div className='flex flex-1 items-center pl-2'>
            <form className='flex flex-1 flex-col'>
                <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                className='h-24 w-full text-xl outline-none placeholder:text-xl'
                type="text" placeholder="What's happening?" />
                <div className='flex items-center '>
                    <div className='flex space-x-2 text-twitter flex-1'>
                        <PhotographIcon
                        onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} 
                        className='h-5 w-5 cursor-pointer 
                        transition-transform duration-150 ease-out hover:scale-150'/>
                        <SearchCircleIcon className='h-5 w-5'/>
                        <EmojiHappyIcon className='h-5 w-5'/>
                        <CalendarIcon className='h-5 w-5'/>
                        <LocationMarkerIcon className='h-5 w-5'/>
                    </div>

                    <button 
                    onClick={handleSubmit}
                    disabled={!input || !session}
                    className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40' >Tweet</button>
                </div>
                {imageUrlBoxIsOpen && (
                    <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
                        <input type="text" 
                        ref={imageInputRef}
                        className="flex-1 bg-transparent p-2 outline-none text-white placeholder:text-white"
                        placeholder='Enter Image Url..'
                        />
                        <button
                        type='submit'
                        onClick={ addImageToTweet}
                        className='font-bold text-white'>Add Image</button>
                    </form>
                )}
                {image && 
                <img className="mt-10 h-40 w-full rounded-xl object-container shadow-lg" src={image} alt="" />
            }
            </form>
        
        </div>
    </div> 
   
    )
}

export default TweetBox