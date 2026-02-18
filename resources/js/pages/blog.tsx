import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    published_at: string;
}

interface Props {
    posts: BlogPost[];
}

const categories = ['All', 'Health & Wellness', 'Nutrition', 'Mental Health', 'Safety', 'Social Wellness'];

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function categoryColor(category: string): string {
    const map: Record<string, string> = {
        'Health & Wellness': 'bg-emerald-100 text-emerald-800',
        Nutrition: 'bg-orange-100 text-orange-800',
        'Mental Health': 'bg-purple-100 text-purple-800',
        Safety: 'bg-red-100 text-red-800',
        'Social Wellness': 'bg-blue-100 text-blue-800',
        'Health Management': 'bg-teal-100 text-teal-800',
    };
    return map[category] ?? 'bg-primary/10 text-primary';
}

export default function Blog({ posts }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPosts =
        selectedCategory === 'All' ? posts : posts.filter((p) => p.category === selectedCategory);

    const featuredPost = posts[0] ?? null;

    return (
        <PublicLayout
            title="Blog"
            description="Wellness articles, tips, and insights to support healthy aging for seniors and their families."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Resources</p>
                        <h1 className="heading-large mb-6">Wellness &amp; Care Resources</h1>
                        <p className="text-senior text-muted-foreground mx-auto max-w-3xl leading-relaxed">
                            Helpful articles, tips, and insights to support you and your loved ones on the journey of
                            healthy aging. From wellness advice to family guidance, we&apos;re here to help.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredPost && (
                <section className="bg-soft-white py-24">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <p className="mb-2 text-base font-semibold uppercase tracking-widest text-primary">Featured</p>
                            <h2 className="heading-medium">Featured Article</h2>
                        </div>

                        <div className="card-warm mx-auto max-w-5xl">
                            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
                                <div>
                                    <div className="mb-5 flex items-center gap-3">
                                        <span
                                            className={`rounded-full px-4 py-1.5 text-base font-medium ${categoryColor(featuredPost.category)}`}
                                        >
                                            {featuredPost.category}
                                        </span>
                                    </div>

                                    <h3 className="heading-medium mb-5">{featuredPost.title}</h3>

                                    <p className="text-senior text-muted-foreground mb-6">{featuredPost.excerpt}</p>

                                    <div className="mb-8 flex flex-wrap items-center gap-5 text-base text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span>St. Joseph Eldercare Team</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(featuredPost.published_at)}</span>
                                        </div>
                                    </div>

                                    <button className="btn-primary">
                                        Read Full Article
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </button>
                                </div>

                                <div className="rounded-2xl bg-gradient-to-br from-forest-green to-sage-green p-8 text-soft-white">
                                    <h4 className="heading-small mb-5 text-soft-white">Benefits of Active Senior Living</h4>
                                    <ul className="space-y-4">
                                        {[
                                            'Improves balance and reduces fall risk',
                                            'Maintains bone density and muscle strength',
                                            'Boosts mood and mental wellbeing',
                                            'Enhances cardiovascular health',
                                        ].map((benefit) => (
                                            <li key={benefit} className="flex items-center gap-3">
                                                <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-warm-gold" />
                                                <span className="text-senior text-soft-white/95">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Articles Grid */}
            <section className="bg-cream py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <p className="mb-2 text-base font-semibold uppercase tracking-widest text-primary">All Articles</p>
                        <h2 className="heading-medium mb-4">Recent Articles</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-2xl">
                            Stay informed with our latest insights on senior care, health, and wellness.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-12 flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full px-5 py-2.5 text-base font-medium transition-all ${
                                    cat === selectedCategory
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'border border-border bg-white text-foreground hover:border-primary/50 hover:text-primary'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="py-16 text-center">
                            <p className="text-senior text-muted-foreground">
                                No articles found. Check back soon for wellness tips and updates!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="card-warm flex flex-col"
                                >
                                    <div className="mb-5 flex items-center gap-3">
                                        <span
                                            className={`rounded-full px-3.5 py-1.5 text-base font-medium ${categoryColor(post.category)}`}
                                        >
                                            {post.category}
                                        </span>
                                        <span className="text-sm text-muted-foreground">5 min read</span>
                                    </div>

                                    <h3 className="heading-small mb-4 line-clamp-2">{post.title}</h3>

                                    <p className="text-senior text-muted-foreground mb-5 line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span>St. Joseph Eldercare Team</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(post.published_at)}</span>
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full border-primary/30 text-base text-primary hover:bg-primary/10">
                                        Read More
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-soft-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-3 text-base font-semibold uppercase tracking-widest text-primary">Talk to Us</p>
                    <h2 className="heading-large mb-6">Have Questions About Senior Care?</h2>
                    <p className="text-senior text-muted-foreground mx-auto mb-10 max-w-2xl">
                        Our experienced team is here to help answer your questions and provide personalized guidance for
                        your family&apos;s unique situation.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/contact" className="btn-primary justify-center text-xl">
                            Contact Our Care Team
                        </Link>
                        <Link href="/faqs" className="btn-secondary justify-center text-xl">
                            View FAQs
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
