import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    category: Category;
    excerpt: string;
    content: string;
    published_at: string;
}

interface RecentPost {
    id: number;
    title: string;
    slug: string;
    category: Category;
    published_at: string;
}

interface Props {
    post: Post;
    recentPosts: RecentPost[];
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

export default function BlogShow({ post, recentPosts, categories }: Props) {
    const styles = getCategoryStyles(post.category.name);

    return (
        <PublicLayout title={post.title} description={post.excerpt}>
            {/* Hero */}
            <section className="bg-gradient-subtle py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <Link
                            href="/blog"
                            className="mb-8 inline-flex items-center gap-2 text-base font-medium text-primary transition-colors hover:text-primary/80"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to all articles
                        </Link>

                        <div className="mb-5 flex flex-wrap items-center gap-3">
                            <span className={`rounded-full px-4 py-1.5 text-base font-medium ${styles.badge}`}>
                                {post.category.name}
                            </span>
                            <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(post.published_at)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>St. Joseph Eldercare Team</span>
                            </div>
                        </div>

                        <h1 className="heading-large mb-6">{post.title}</h1>

                        <p className="text-senior text-muted-foreground leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content + Sidebar */}
            <section className="bg-soft-white py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">

                            {/* Article body */}
                            <article>
                                <div className="card-warm overflow-hidden p-0">
                                    <div className={`h-1.5 w-full ${styles.accent}`} />
                                    <div
                                        className="article-content p-8 sm:p-10"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>

                                {/* Bottom nav */}
                                <div className="mt-8 flex items-center justify-between">
                                    <Link
                                        href="/blog"
                                        className="inline-flex items-center gap-2 text-base font-medium text-primary transition-colors hover:text-primary/80"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        All Articles
                                    </Link>
                                    <Link href="/inquire" className="btn-primary text-base">
                                        Submit an Inquiry
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </article>

                            {/* Sidebar */}
                            <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">

                                {/* Recent Posts */}
                                {recentPosts.length > 0 && (
                                    <div className="card-warm p-6">
                                        <h3 className="heading-small mb-5 border-b border-border pb-4">
                                            Recent Articles
                                        </h3>
                                        <div className="space-y-4">
                                            {recentPosts.map((recent) => {
                                                const rs = getCategoryStyles(recent.category.name);
                                                return (
                                                    <Link
                                                        key={recent.id}
                                                        href={`/blog/${recent.slug}`}
                                                        className="group block"
                                                    >
                                                        <span className={`mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-sm font-medium ${rs.badge}`}>
                                                            {recent.category.name}
                                                        </span>
                                                        <p className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                                                            {recent.title}
                                                        </p>
                                                        <p className="mt-1 text-sm text-muted-foreground">
                                                            {formatDate(recent.published_at)}
                                                        </p>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Categories */}
                                <div className="card-warm p-6">
                                    <h3 className="heading-small mb-5 border-b border-border pb-4">
                                        Categories
                                    </h3>
                                    <div className="space-y-1">
                                        {categories.map((cat) => {
                                            const cs = getCategoryStyles(cat.name);
                                            const isActive = cat.id === post.category.id;
                                            return (
                                                <Link
                                                    key={cat.id}
                                                    href="/blog"
                                                    className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-muted/60 ${isActive ? 'bg-muted/60' : ''}`}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <div className={`h-2.5 w-2.5 rounded-full ${cs.accent}`} />
                                                        <span className={`text-base ${isActive ? 'font-semibold text-primary' : 'text-foreground'}`}>
                                                            {cat.name}
                                                        </span>
                                                    </div>
                                                    {(cat.posts_count ?? 0) > 0 && (
                                                        <span className="rounded-full bg-muted px-2 py-0.5 text-sm text-muted-foreground">
                                                            {cat.posts_count}
                                                        </span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="rounded-2xl bg-gradient-to-br from-forest-green to-sage-green p-6 text-soft-white">
                                    <h3 className="mb-3 text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Ready to Learn More?
                                    </h3>
                                    <p className="mb-5 text-base leading-relaxed text-soft-white/90">
                                        Our team is happy to answer questions about care for your loved one.
                                    </p>
                                    <Link
                                        href="/inquire"
                                        className="flex items-center justify-center gap-2 rounded-[0.625rem] bg-warm-gold px-5 py-3 text-base font-semibold text-forest-green transition-all hover:bg-warm-gold/90"
                                    >
                                        Submit an Inquiry
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
