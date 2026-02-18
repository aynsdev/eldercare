import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    category: Category;
    excerpt: string;
    published_at: string;
}

interface Props {
    posts: BlogPost[];
    categories: Category[];
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

const CATEGORY_STYLES: Record<string, { badge: string; accent: string }> = {
    'Health & Wellness': { badge: 'bg-emerald-100 text-emerald-800', accent: 'bg-emerald-500' },
    'Nutrition':         { badge: 'bg-orange-100 text-orange-800',   accent: 'bg-orange-400' },
    'Mental Health':     { badge: 'bg-purple-100 text-purple-800',   accent: 'bg-purple-500' },
    'Safety':            { badge: 'bg-red-100 text-red-800',         accent: 'bg-red-400' },
    'Social Wellness':   { badge: 'bg-blue-100 text-blue-800',       accent: 'bg-blue-500' },
    'Activities':        { badge: 'bg-yellow-100 text-yellow-800',   accent: 'bg-yellow-400' },
    'Caregiver Tips':    { badge: 'bg-teal-100 text-teal-800',       accent: 'bg-teal-500' },
    'Memory Care':       { badge: 'bg-pink-100 text-pink-800',       accent: 'bg-pink-400' },
};

function getCategoryStyles(name: string) {
    return CATEGORY_STYLES[name] ?? { badge: 'bg-primary/10 text-primary', accent: 'bg-primary' };
}

export default function Blog({ posts, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const filteredPosts =
        selectedCategory === null ? posts : posts.filter((p) => p.category.id === selectedCategory);

    const [featuredPost] = posts;

    return (
        <PublicLayout
            title="Blog"
            description="Wellness articles, tips, and insights to support healthy aging for seniors and their families."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">
                            Resources
                        </p>
                        <h1 className="heading-large mb-6">Wellness &amp; Care Resources</h1>
                        <p className="text-senior text-muted-foreground mx-auto max-w-2xl leading-relaxed">
                            Helpful articles and insights to support you and your loved ones on the journey of
                            healthy aging.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredPost && (
                <section className="bg-soft-white py-20">
                    <div className="container mx-auto px-4">
                        <p className="mb-8 text-center text-base font-semibold uppercase tracking-widest text-primary">
                            Featured Article
                        </p>

                        <Link href={`/blog/${featuredPost.slug}`} className="group mx-auto block max-w-5xl">
                            <div className="card-warm overflow-hidden p-0">
                                {/* Category accent bar */}
                                <div className={`h-1.5 w-full ${getCategoryStyles(featuredPost.category.name).accent}`} />

                                <div className="p-8 sm:p-10">
                                    <div className="mb-5 flex items-center gap-3">
                                        <span className={`rounded-full px-4 py-1.5 text-base font-medium ${getCategoryStyles(featuredPost.category.name).badge}`}>
                                            {featuredPost.category.name}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(featuredPost.published_at)}
                                        </span>
                                    </div>

                                    <h2 className="heading-medium mb-5 transition-colors group-hover:text-primary">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-senior text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>

                                    <span className="btn-primary inline-flex">
                                        Read Full Article
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Articles Grid */}
            <section className="bg-cream py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <p className="mb-2 text-base font-semibold uppercase tracking-widest text-primary">
                            All Articles
                        </p>
                        <h2 className="heading-medium mb-4">Browse Our Library</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-2xl">
                            Stay informed with our latest insights on senior care, health, and wellness.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-12 flex flex-wrap justify-center gap-2.5">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`rounded-full border px-5 py-2 text-base font-medium transition-all ${
                                selectedCategory === null
                                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                    : 'border-border bg-white text-foreground hover:border-primary/40 hover:text-primary'
                            }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`rounded-full border px-5 py-2 text-base font-medium transition-all ${
                                    selectedCategory === cat.id
                                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                        : 'border-border bg-white text-foreground hover:border-primary/40 hover:text-primary'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="py-20 text-center">
                            <Tag className="mx-auto mb-4 h-10 w-10 text-muted-foreground/40" />
                            <p className="text-senior text-muted-foreground">
                                No articles in this category yet. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((post) => {
                                const styles = getCategoryStyles(post.category.name);
                                return (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group block"
                                    >
                                        <article className="card-warm flex h-full flex-col overflow-hidden p-0">
                                            {/* Category accent bar */}
                                            <div className={`h-1 w-full ${styles.accent}`} />

                                            <div className="flex flex-1 flex-col p-6">
                                                <div className="mb-4 flex items-center justify-between">
                                                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${styles.badge}`}>
                                                        {post.category.name}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        <span>{formatDate(post.published_at)}</span>
                                                    </div>
                                                </div>

                                                <h3 className="heading-small mb-3 line-clamp-2 transition-colors group-hover:text-primary">
                                                    {post.title}
                                                </h3>

                                                <p className="text-senior mb-6 line-clamp-3 flex-1 text-muted-foreground">
                                                    {post.excerpt}
                                                </p>

                                                <span className="inline-flex items-center text-base font-semibold text-primary transition-colors group-hover:text-primary/80">
                                                    Read More
                                                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-warm py-24 text-soft-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-4xl font-semibold md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        Have Questions About Senior Care?
                    </h2>
                    <p className="text-senior mx-auto mb-10 max-w-2xl leading-relaxed text-soft-white/90">
                        Our experienced team is here to help answer your questions and provide personalized guidance
                        for your family&apos;s unique situation.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] bg-soft-white px-10 py-4 text-xl font-semibold text-forest-green shadow-lg transition-all hover:bg-soft-white/90"
                        >
                            Contact Our Care Team
                        </Link>
                        <Link
                            href="/faqs"
                            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.625rem] border-2 border-soft-white/50 bg-soft-white/15 px-10 py-4 text-xl font-semibold text-soft-white backdrop-blur-sm transition-all hover:bg-soft-white hover:text-forest-green"
                        >
                            View FAQs
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
