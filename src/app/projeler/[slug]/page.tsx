import { projectsData } from '@/data/projects';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ProjeDetayClient from './ProjeDetayClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export default async function ProjeDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#171815]" />}>
      <ProjeDetayClient project={project} />
    </Suspense>
  );
}
