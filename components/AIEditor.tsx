
import React, { useState } from 'react';
import { Sparkles, Loader2, Upload, Eraser } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

interface AIEditorProps {
  currentImage?: string;
  onImageGenerated: (newImageUrl: string) => void;
  onImageClear: () => void;
}

const AIEditor: React.FC<AIEditorProps> = ({ currentImage, onImageGenerated, onImageClear }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageGenerated(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!currentImage || !prompt.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const editedImage = await editImageWithGemini(currentImage, prompt);
      onImageGenerated(editedImage);
      setPrompt('');
    } catch (err: any) {
      setError(err.message || 'Failed to edit image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg mt-4 shadow-inner">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">AI Visual Studio</h3>
      </div>

      {!currentImage ? (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white hover:bg-slate-50 transition-colors cursor-pointer relative">
          <Upload className="w-8 h-8 text-slate-400 mb-2" />
          <p className="text-xs text-slate-500 font-medium">Upload base visual for AI editing</p>
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={handleFileUpload}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative group">
            <img 
              src={currentImage} 
              alt="Asset to edit" 
              className="w-full h-32 object-cover rounded border border-slate-200"
            />
            <button 
              onClick={onImageClear}
              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Add a vintage 1970s film filter' or 'Make it look like a vector illustration'"
              className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none h-20 resize-none"
            />
            <button
              onClick={handleEdit}
              disabled={loading || !prompt.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 text-xs transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Visuals...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate AI Edit
                </>
              )}
            </button>
          </div>
          {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default AIEditor;
