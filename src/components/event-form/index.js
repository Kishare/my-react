import React from 'react';
import axios from 'axios';

import {
  Container,
  Form,
  Button,
  Card,
  Row,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userInput: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { userInput } = this.state;
    axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&q=${userInput}`)
      .then((res) => {
        const events = res.data.records.map(({ fields }) => ({
          title: fields.title,
          description: fields.lead_text,
          image: fields.cover_url,
          id: fields.id,
          category: fields.category,
          address: fields.address_name,
          city: fields.address_city,
          zipcode: fields.address_zipcode,
        }));
        this.setState({ events });
      });
  }

  render() {
    const { events } = this.state;
    return (
      <Container>
        <Form>
          <Form.Control type="text" placeholder="Rechercher un évènement par le nom" onChange={(e) => this.setState({ events, userInput: e.target.value })} />
          <Button variant="primary" type="button" onClick={this.componentDidMount}>
            Rechercher
          </Button>
        </Form>
        <Form>
          <Form.Control type="text" placeholder="Rechercher un évènement par la date" onChange={(e) => this.setState({ events, userInput: e.target.value })} />
          <Button variant="primary" type="button" onClick={this.searchData}>
            Rechercher
          </Button>
        </Form>
        <Row>
          {events.map((event) => (
            <Card style={{ width: '18rem', margin: '1vw' }} key={event.id}>
              <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>{event.city}</ListGroupItem>
                  <ListGroupItem>{event.zipcode}</ListGroupItem>
                  <ListGroupItem>{event.address}</ListGroupItem>
                </ListGroup>
                <Card.Footer>{event.category}</Card.Footer>
                <Button variant="primary">Voir plus</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}
