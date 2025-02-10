<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Attribute\Route;

class MercureController extends AbstractController
{
    #[Route("/publish", methods: ['POST'])]
    public function publish(Request $request, HubInterface $hub): Response
    {
        $data = json_decode($request->getContent(), true);

        $update = new Update(
            'http://localhost:8083/.well-known/mercure/ui/demo/books/1.jsonld',
            json_encode(['message' => $data['message']])
        );

        $hub->publish($update);

        return new Response('published!');
    }
}