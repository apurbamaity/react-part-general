// RichTextEditor.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'

import ReactQuill from 'react-quill-new';
import 'quill/dist/quill.snow.css';
// import the Quill snow theme
// Optionally: import any custom CSS/overrides

export default function RichTextEditor({
    initialContent = '',
    placeholder = 'Start writing here…',
}) {
    const [value, setValue] = useState(initialContent);
    const [subgoals, setSubgoals] = useState([]);
    const [goals, setGoals] = useState([]);


    const quillRef = useRef(null);
    const backend_url = "http://127.0.0.1:5000"



    // utility functions
    function isMeaningfulHtml(htmlString) {
        if (!htmlString) return false;
        const trimmed = htmlString.trim();
        if (trimmed === '') return false;
        // Strip tags and check text content
        const tmp = document.createElement('div');
        tmp.innerHTML = trimmed;
        const text = tmp.textContent || tmp.innerText || '';
        // If no actual visible text, consider it empty
        return text.trim().length > 0;
    }

    // react functions
    const addthegoal = () => {
        if (!isMeaningfulHtml(value)) {
            console.log("Not valis html add simething valid")
            return
        }
        setSubgoals([...subgoals, value])
        console.log(subgoals)
        setValue(initialContent)
    }

    //axios calls
    const submitgoals = async () => {
        console.log(JSON.stringify({ subgoals: subgoals }))
        let request_body = {
            subgoals: subgoals
        }
        setSubgoals([])
        try {
            const res = await axios.post(`${backend_url}/subgoals`, request_body)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    const getallgoals = async () => {
        try {
            const res = await axios.get(`${backend_url}/subgoals`)
            console.log(res.data)
            setGoals(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link', 'image', 'code-block'],
            [{ color: [] }, { background: [] }],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'indent',
        'align',
        'link', 'image', 'code-block',
        'color', 'background',
    ];

    // Handler when content changes
    const handleChange = html => {
        setValue(html);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-2">Rich Text Editor</h2>
            <div className="bg-white rounded shadow">
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                />
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <p>Content HTML:</p>
                <div className="prose mt-2 border p-2 rounded bg-gray-50">
                    <div dangerouslySetInnerHTML={{ __html: value }} />
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                <button class="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 my-4 px-4 rounded" onClick={addthegoal}>
                    Add the goal
                </button>
                <button class="bg-green-400 hover:bg-green-700 hover:cursor-pointer text-white font-bold py-2 my-4 px-4 rounded" onClick={submitgoals}>
                    Submit all subgoals
                </button>
                <button class="bg-orange-400 hover:bg-orange-700 hover:cursor-pointer text-white font-bold py-2 my-4 px-4 rounded" onClick={getallgoals}>
                    Get all goals
                </button>
            </div>

            <div className='my-4'>
                {
                    goals.length > 0 ? (
                        <div className="max-w-3xl mx-auto p-4 space-y-6">
                            <h1 className="text-2xl font-bold mb-4">Subgoals</h1>
                            {goals.map(goal => (
                                <div key={goal.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                                    <div className="mb-2 text-sm text-gray-500">Goal ID: {goal.goalid}</div>
                                    <div
                                        className="prose prose-sm list-decimal list-inside"
                                        dangerouslySetInnerHTML={{ __html: goal.subgoals_html }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1>no goals</h1>
                    )
                }

            </div>



        </div>
    );
}
