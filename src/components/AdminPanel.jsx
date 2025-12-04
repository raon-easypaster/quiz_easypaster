import React, { useState } from 'react';

function AdminPanel({ categories, onSave, onReset }) {
    const [editedCategories, setEditedCategories] = useState(JSON.parse(JSON.stringify(categories)));
    const [expandedCategory, setExpandedCategory] = useState(null);

    const handleQuestionChange = (catId, qId, field, value) => {
        const newCategories = [...editedCategories];
        const category = newCategories.find(c => c.id === catId);
        const question = category.questions.find(q => q.id === qId);
        question[field] = value;
        setEditedCategories(newCategories);
    };

    const handleFileUpload = (catId, qId, file) => {
        if (!file) return;

        // Check file size (limit to ~500KB for localStorage safety, though ideally we warn)
        if (file.size > 500000) {
            alert('파일 크기가 너무 큽니다. 500KB 이하의 파일을 사용해주세요.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            handleQuestionChange(catId, qId, 'media', reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        onSave(editedCategories);
        alert('저장되었습니다!');
    };

    const handleCategoryNameChange = (catId, newName) => {
        const newCategories = [...editedCategories];
        const category = newCategories.find(c => c.id === catId);
        category.name = newName;
        setEditedCategories(newCategories);
    };

    return (
        <div className="admin-panel" style={{ padding: '2rem', backgroundColor: '#fff', color: '#333', borderRadius: '1rem', maxWidth: '1000px', margin: '2rem auto' }}>
            <h1 style={{ marginBottom: '2rem' }}>관리자 모드 (문제 수정)</h1>

            <div className="admin-actions" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" onClick={handleSave}>변경사항 저장</button>
                <button className="btn-close" onClick={onReset} style={{ backgroundColor: '#d9534f', color: 'white' }}>초기화 (기본값)</button>
            </div>

            <div className="categories-list">
                {editedCategories.map(cat => (
                    <div key={cat.id} style={{ marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '0.5rem', overflow: 'hidden' }}>
                        <div
                            style={{ padding: '1rem', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexGrow: 1 }}>
                                <span
                                    onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                    style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' }}
                                >
                                    {expandedCategory === cat.id ? '▼' : '▶'}
                                </span>
                                <input
                                    type="text"
                                    value={cat.name}
                                    onChange={(e) => handleCategoryNameChange(cat.id, e.target.value)}
                                    style={{ padding: '0.5rem', fontSize: '1.1rem', fontWeight: 'bold', width: '200px' }}
                                />
                            </div>
                        </div>

                        {expandedCategory === cat.id && (
                            <div style={{ padding: '1rem' }}>
                                {cat.questions.map(q => (
                                    <div key={q.id} style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                        <h3 style={{ margin: '0 0 1rem 0' }}>{q.points}점 문제</h3>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>질문</label>
                                                <textarea
                                                    value={q.question}
                                                    onChange={(e) => handleQuestionChange(cat.id, q.id, 'question', e.target.value)}
                                                    style={{ width: '100%', padding: '0.5rem', minHeight: '60px' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>정답</label>
                                                <input
                                                    type="text"
                                                    value={q.answer}
                                                    onChange={(e) => handleQuestionChange(cat.id, q.id, 'answer', e.target.value)}
                                                    style={{ width: '100%', padding: '0.5rem' }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>미디어 타입</label>
                                                <select
                                                    value={q.type || 'text'}
                                                    onChange={(e) => handleQuestionChange(cat.id, q.id, 'type', e.target.value)}
                                                    style={{ padding: '0.5rem' }}
                                                >
                                                    <option value="text">텍스트만</option>
                                                    <option value="image">이미지</option>
                                                    <option value="audio">오디오</option>
                                                </select>
                                            </div>

                                            {(q.type === 'image' || q.type === 'audio') && (
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>파일 업로드</label>
                                                    <input
                                                        type="file"
                                                        accept={q.type === 'image' ? "image/*" : "audio/*"}
                                                        onChange={(e) => handleFileUpload(cat.id, q.id, e.target.files[0])}
                                                    />
                                                    {q.media && <span style={{ color: 'green', marginLeft: '0.5rem' }}>✓ 파일 있음</span>}

                                                    {/* Media Preview */}
                                                    {q.media && q.type === 'image' && (
                                                        <div style={{ marginTop: '0.5rem' }}>
                                                            <img
                                                                src={q.media}
                                                                alt="Preview"
                                                                style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '0.5rem', border: '2px solid #ddd' }}
                                                            />
                                                        </div>
                                                    )}
                                                    {q.media && q.type === 'audio' && (
                                                        <div style={{ marginTop: '0.5rem' }}>
                                                            <audio controls style={{ width: '100%', maxWidth: '300px' }}>
                                                                <source src={q.media} />
                                                            </audio>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;
