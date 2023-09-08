import React from 'react'
import { useState, getState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import preview from '../assets/preview.png'
import Load from '../components/Load';
import Form from '../components/Form';
import { getRandomPrompt } from '../utils';
import { surpriseMePrompts } from '../constants';
import postImage from '../images/post.svg';

const Post = () => {

    // console.log(surpriseMePrompts);
    const navigate = new useNavigate();
    const [loading, setLoading] = useState(false);
    const [getImages, setImages] = useState(false);
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("prompt of form is" + form.prompt);
        console.log(form);
        if (form.prompt.length > 0 && form.photo.length > 0) {
            try {
                setLoading(true);
                console.log(form);
                const response = await fetch('http://localhost:8000/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form), // Send the entire form object
                });


                await response.json();

                alert('Image shared successfully!');
                navigate('/');
            } catch (err) {
                console.error(err); // Use console.error to log errors
                alert('An error occurred while sharing the image.');
            }
            finally {
                setLoading(false);
            }
        } else {
            alert('Please provide a proper prompt');
        }
    };
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSurprise = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
        console.log(randomPrompt);
    };
    const generateImage = async () => {
        if (form.prompt) {
            try {
                setImages(true);
                const response = await fetch('http://localhost:8000/api/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                    })
                });

                const data = await response.json();
                console.log('Response:', response);
                console.log('Response data:', data);
                setForm({ ...form,photo:`data:image/jpeg;base64,${data.photo}`});
                setImages(false);
            } catch (err) {
                console.error(err); // Use console.error to log errors
                alert('An error occurred while generating the image.');
            }
        } else {
            alert('Please provide a proper prompt');
        }
    };


    return (
        <div className='max-w-2xl mx-auto'>
            <div>
                <div className="text-center">
                    <h1 className="font-extrabold text-[#222328] text-4xl">Hello user!!👋</h1>
                    <p className="mt-2 text-[#666e75] text-base max-w-[500px]">Share your thoughts with the help of posts 💭</p>
                </div>
            </div>
            <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <img className='login' alt='login' src={postImage} />
                    <Form
                        labelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="Enter your good name"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <Form
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="enter your prompt here"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurprise
                        handleSurprise={handleSurprise}
                    />

                </div>

                <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 my-4 mx-auto flex justify-center items-center'>
                    {form.photo ? (
                        <img
                            src={form.photo}
                            alt={form.prompt}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <img
                            src={preview}
                            alt="preview"
                            className="w-9/12 h-9/12 object-contain opacity-40"
                        />
                    )}
                    {getImages && (
                        <div className="absolute inset-0 z-0 flex p-3 h-64 my-4 mx-auto justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                            <Load/>
                        </div>
                    )}
                </div>

                <div class="flex justify-center items-center mt-5 gap-5">
                    <button
                        type="button"
                        onClick={generateImage}
                        className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {getImages ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                <div className="mt-10 flex flex-col items-center">
                    <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
                    <button
                        type="submit"
                        className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {loading ? 'Sharing...' : 'Share with the Community'}
                    </button>
                </div>

            </form >
        </div >
    )
}

export default Post