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
        'Health & Wellness': 'bg-green-100 text-green-800',
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
            title="Blog — St. Joseph Eldercare Residences"
            description="Wellness articles, tips, and insights to support healthy aging for seniors and their families."
        >
            {/* Hero */}
            <section className="bg-gradient-subtle py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="heading-large mb-6">Wellness &amp; Care Resources</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Helpful articles, tips, and insights to support you and your loved ones on the journey of
                            healthy aging. From wellness advice to family guidance, we&apos;re here to help.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredPost && (
                <section className="bg-soft-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-12 text-center">
                            <h2 className="heading-medium mb-4">Featured Article</h2>
                        </div>

                        <div className="card-warm mx-auto max-w-4xl">
                            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                                <div>
                                    <div className="mb-4 flex items-center gap-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium ${categoryColor(featuredPost.category)}`}
                                        >
                                            {featuredPost.category}
                                        </span>
                                    </div>

                                    <h3 className="heading-medium mb-4">{featuredPost.title}</h3>

                                    <p className="text-senior text-muted-foreground mb-6">{featuredPost.excerpt}</p>

                                    <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
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

                                <div className="bg-gradient-warm rounded-xl p-8 text-soft-white">
                                    <h4 className="heading-small mb-4">Benefits of Active Senior Living</h4>
                                    <ul className="text-senior space-y-3">
                                        {[
                                            'Improves balance and reduces fall risk',
                                            'Maintains bone density and muscle strength',
                                            'Boosts mood and mental wellbeing',
                                            'Enhances cardiovascular health',
                                        ].map((benefit) => (
                                            <li key={benefit} className="flex items-center gap-3">
                                                <div className="h-2 w-2 shrink-0 rounded-full bg-warm-gold" />
                                                <span>{benefit}</span>
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
            <section className="bg-cream py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-center">
                        <h2 className="heading-medium mb-6">Recent Articles</h2>
                        <p className="text-senior text-muted-foreground mx-auto max-w-2xl">
                            Stay informed with our latest insights on senior care, health, and wellness.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-12 flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={cat === selectedCategory ? 'default' : 'outline'}
                                className="text-senior"
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-senior text-muted-foreground">
                                No articles found. Check back soon for wellness tips and updates!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="card-warm flex flex-col transition-shadow duration-200 hover:shadow-lg"
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium ${categoryColor(post.category)}`}
                                        >
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground">5 min read</span>
                                    </div>

                                    <h3 className="heading-small mb-3 line-clamp-2">{post.title}</h3>

                                    <p className="text-senior text-muted-foreground mb-4 line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span>St. Joseph Eldercare Team</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(post.published_at)}</span>
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full">
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
            <section className="bg-soft-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="heading-large mb-6">Have Questions About Senior Care?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
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
