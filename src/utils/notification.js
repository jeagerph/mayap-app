export function Notif(data)
{
    let icon = 'fa-bug';
	if(data.type == 'registration') icon = 'fa-user-plus';
    else if(data.type == 'activation') icon = 'fa-check';
    else if(data.type == 'update-profile') icon = 'fa-pencil';
    else if(data.type == 'upload-document') icon = 'fa-file-o';
    else if(data.type == 'new-job') icon = 'fa-pencil-square-o';
    else if(data.type == 'approved-registration') icon = 'fa-check-square-o';
    else if(data.type == 'declined-registration') icon = 'fa-times';
    else if(data.type == 'approved-job') icon = 'fa-check-square-o';
    else if(data.type == 'approved-document') icon = 'fa-check';
    else if(data.type == 'rejected-document') icon = 'fa-times';
    else if(data.type == 'viewed-resume') icon = 'fa-eye';
    else if(data.type == 'engage') icon = 'fa-envelope-o';
    else if(data.type == 'message') icon = 'fa-envelope-o';
    else if(data.type == 'applied-job') icon = 'fa-file-text';
    else if(data.type == 'received-application') icon = 'fa-file-text';
    else if(data.type == 'offered-job') icon = 'fa-briefcase';

    let path = '/404';
    if(data.route == 'administration-seekers') path = `/administration/job-seekers/${data.slug.slug}`;
    else if(data.route == 'administration-employers') path = `/administration/employers/${data.slug.slug}`;
    else if(data.route == 'administration-job-posts') path = `/administration/job-posts/${data.slug.slug}`;
    else if(data.route == 'my-jobs') path = `/my-applicants?code=${data.slug.code}`;
    else if(data.route == 'my-applicants') path = `/my-applicants/${data.slug.slug}`;
    else if(data.route == 'my-applications') path = `/my-applications/${data.slug.slug}`;
    else if(data.route == 'my-documents') path = '/my-documents';
    else if(data.route == 'my-company') path = '/my-company';

    return { icon: icon, path: path };
}