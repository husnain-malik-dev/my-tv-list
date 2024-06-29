import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/app/db/prisma';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400
    });
  }

  const eventType = evt.type;

  try {
    if (eventType === 'user.created') {
      await handleUserCreated(evt.data);
    } else if (eventType === 'user.updated') {
      await handleUserUpdated(evt.data);
    } else if (eventType === 'user.deleted') {
      await handleUserDeleted(evt.data);
    }
  } catch (error) {
    console.error('Error handling event:', error);
    return new Response('Error occurred', {
      status: 500
    });
  }

  return new Response('', { status: 200 });
}

async function handleUserCreated(data: any) {
  const { id, email_addresses, username, image_url } = data;

  const user = {
    id,
    email: email_addresses[0]?.email_address || '',
    userName: username || '',
    imageUrl: image_url || ''
  };

  await prisma.user.create({ data: user });
}

async function handleUserUpdated(data: any) {
  const { id, email_addresses, username, image_url } = data;

  const updateData = {
    email: email_addresses[0]?.email_address || '',
    userName: username || '',
    imageUrl: image_url || ''
  };

  await prisma.user.update({
    where: { id },
    data: updateData
  });
}

async function handleUserDeleted(data: any) {

    const { id } = data;

  await prisma.user.delete({
    where: { id }
  });
}