import { Comment } from "../typings"
export const fetchComments = async(tweetId: string)  => {
    const res = await fetch(`http://localhost:3000/api/getComments?tweetId=${tweetId}`)
    // console.log(res, 'this is the response in fetch')

    const comments: Comment[] = await res.json()
// console.log(comments)
    return comments

}

//fetchComments('aafbab0b-b6ad-4f6b-a222-cbdc323ff5fa')
//http:
//http://localhost:3000/api/getComments?tweetId=aafbab0b-b6ad-4f6b-a222-cbdc323ff5fa

///api/getComments?tweetId=aafbab0b-b6ad-4f6b-a222-cbdc323ff5fa