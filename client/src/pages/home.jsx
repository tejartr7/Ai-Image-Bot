import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Form from '../components/Form';
import Load from '../components/Load';

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return (
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {data.map((post) => (
                    <Card key={post._id} {...post} />
                ))}
            </div>
        );
    }

    return (
        <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
};

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allposts, setAllposts] = useState(null);
    const [search, setSearch] = useState('');
    const [searchedResults, setSearchedResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);
    
    const fetchPosts = async () => {
        setLoading(true);

        try {
            const response = await fetch('https://ai-backend-a30h.onrender.com/api/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setAllposts(result.data.reverse());
            } else {
                console.error('API request failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching data from the server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(); // Call fetchPosts only once when the component mounts.
    }, []);

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        const searchText = e.target.value;
        setSearch(searchText);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allposts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
                setSearchedResults(searchResult);
            }, 500),
        );
    };

    return (
        <div className='max-w-3xl mx-auto'>
            <div>
                <div className="text-center">
                    <h1 className="font-extrabold text-[#222328] text-4xl">Hello all!!👋</h1>
                    <h1 className="font-extrabold text-[#222328] text-4xl">Note:Chatgpt api is revoked so just change the api key and the website will work fine:)</h1>
                    <p className="mx-auto mt-2 text-[#666e75] text-base max-w-[500px] text-center">Get into the world of AI 🤖</p>
                </div>
            </div>
            <div className='mt-16'>
                <Form
                    labelName="Search posts"
                    type="text"
                    name="text"
                    placeholder="Search something..."
                    value={search}
                    handleChange={handleSearchChange}
                />
            </div>
            <div className="mt-10">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Load />
                    </div>
                ) : (
                    <>
                        {search && (
                            <h2 className="font-medium text-[#666e75] text-xl mb-3">
                                Showing Results for <span className="text-[#222328]">{search}</span>:
                            </h2>
                        )}
                        <div className="grid lg:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 grid-cols-1 gap-3">
                            {search ? (
                                <RenderCards
                                    data={searchedResults}
                                    title="Results Found"
                                />
                            ) : (
                                <RenderCards
                                    data={allposts}
                                    title="No Posts Yet"
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
