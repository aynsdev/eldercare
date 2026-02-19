export type BlogCategory = {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
};

export type BlogPost = {
    id: number;
    title: string;
    slug: string;
    category_id: number;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    status: 'draft' | 'published';
    published_at: string | null;
    created_at: string;
    updated_at: string;
    category?: BlogCategory;
};

export type Team = {
    id: number;
    name: string;
    position: string;
    bio: string | null;
    photo: string | null;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type Testimonial = {
    id: number;
    name: string;
    relation: string | null;
    content: string;
    rating: number;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    updated_at: string;
};

export type Inquiry = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    preferred_contact: string | null;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at: string;
    updated_at: string;
};

export type AdmissionInquiry = {
    id: number;

    // Inquirer
    title: string | null;
    first_name: string;
    last_name: string;
    address: string | null;
    phone: string;
    email: string;
    preferred_contact: string | null;

    // Prospective resident
    resident_name: string;
    resident_gender: string | null;
    resident_address: string | null;
    resident_date_of_birth: string | null;
    relationship: string | null;

    // Care needs
    care_service: string | null;
    medical_conditions: string[] | null;
    special_needs: string | null;
    needs_walking_assistance: boolean;
    is_wheelchair_bound: boolean;
    needs_bathing_assistance: boolean;
    has_feeding_tube: string | null;

    // Scheduling
    move_in_timeline: string | null;
    preferred_tour_date: string | null;
    preferred_tour_time: string | null;

    // Other
    how_found_us: string | null;
    additional_info: string | null;
    status: 'new' | 'contacted' | 'scheduled' | 'admitted' | 'closed';

    // Computed
    full_name?: string;

    created_at: string;
    updated_at: string;
};
