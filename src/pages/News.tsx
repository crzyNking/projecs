import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface NewsArticle {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  image_url: string
  category: string
  is_published: boolean
  is_featured: boolean
  published_at: string | null
  created_at: string
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  useEffect(() => {
    loadNews()
  }, [])

  async function loadNews() {
    const { data } = await supabase
      .from('news')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    setArticles(data || [])
    setLoading(false)
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />

      {/* Hero */}
      <section className="bg-[#0b1f40] py-16 sm:py-24 px-4 text-center">
        <div className="max-w-[800px] mx-auto">
          <span className="inline-block bg-[#C4CCE8] text-[#2C2E68] text-[11px] font-bold tracking-[0.06em] px-3.5 py-1.5 rounded mb-5">
            NEWS & EVENTS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white mb-4">
            News & Events
          </h1>
          <p className="text-[15px] text-white/60 leading-relaxed">
            Stay updated with the latest news, events, and announcements from Cebu Eastern College.
          </p>
        </div>
      </section>

      <div className="max-w-[1040px] mx-auto px-5 py-10 pb-20">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#13275c]/30 border-t-[#13275c] rounded-full animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-gray-400 shadow-sm border border-gray-100">
            No news articles available yet. Check back soon!
          </div>
        ) : selectedArticle ? (
          /* Article Detail View */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 px-6 py-4 text-sm text-[#13275c] hover:bg-gray-50 transition-colors border-b border-gray-100 w-full text-left"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to News
            </button>
            {selectedArticle.image_url && (
              <img src={selectedArticle.image_url} alt={selectedArticle.title} className="w-full h-[300px] object-cover" />
            )}
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-[#C4CCE8] text-[#2C2E68] text-[11px] font-bold tracking-[0.06em] px-3 py-1 rounded capitalize">
                  {selectedArticle.category}
                </span>
                <span className="text-sm text-gray-400">{formatDate(selectedArticle.published_at)}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00004D] mb-6">{selectedArticle.title}</h1>
              {selectedArticle.summary && (
                <p className="text-gray-500 text-lg mb-6 leading-relaxed">{selectedArticle.summary}</p>
              )}
              <div className="prose prose-gray max-w-none">
                {selectedArticle.content.split('\n').map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* News Grid */
          <div className="grid gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row">
                  {article.image_url && (
                    <img src={article.image_url} alt={article.title} className="sm:w-[280px] h-[200px] sm:h-auto object-cover shrink-0" />
                  )}
                  <div className="p-5 sm:p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block bg-[#C4CCE8] text-[#2C2E68] text-[11px] font-bold tracking-[0.06em] px-3 py-1 rounded capitalize">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(article.published_at)}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#00004D] mb-2 hover:text-[#13275c]">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {article.summary || article.content?.slice(0, 200)}
                    </p>
                    <div className="mt-3">
                      <span className="text-sm font-semibold text-[#13275c] hover:underline">Read more →</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
